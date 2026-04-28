// Server-only helpers for AI document extraction.
// Do NOT import this from client/component code — protected by *.server convention.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-2.5-flash"; // vision-capable, fast & cost effective

const SYSTEM_PROMPT = `You are an information-management assistant for Amani Nzuri, a South African records-digitisation consultancy.
You receive a single business document (invoice, receipt, contract, ID, letter, statement, etc.) as text or image.
Your job is to:
1. Identify the document type.
2. Extract a clean plain-text transcription (preserve line breaks, do not invent content).
3. Extract the most useful structured fields a small business would want indexed for that document type.
   Common fields: document_type, document_number, issue_date, due_date, party_from, party_to,
   total_amount, currency, vat_amount, line_items (array of { description, quantity, unit_price, amount }),
   reference_numbers, contact_email, contact_phone.
   Only include fields you can confidently read. Use ISO format for dates (YYYY-MM-DD).
4. Provide a short summary (max 2 sentences) of what the document is about.

Be conservative — leave a field out rather than guess.`;

const EXTRACTION_TOOL = {
  type: "function" as const,
  function: {
    name: "save_document_extraction",
    description: "Save the extracted text, structured fields and summary for a digitised business document.",
    parameters: {
      type: "object",
      properties: {
        document_type: {
          type: "string",
          description: "Best guess of document type, e.g. 'Invoice', 'Receipt', 'Contract', 'Bank statement', 'ID document', 'Letter', 'Other'.",
        },
        summary: {
          type: "string",
          description: "Short 1-2 sentence summary of the document.",
        },
        extracted_text: {
          type: "string",
          description: "Plain text transcription of the entire document.",
        },
        fields: {
          type: "object",
          description: "Key-value structured fields extracted from the document. Use snake_case keys. Only include fields confidently identified.",
          additionalProperties: true,
        },
      },
      required: ["document_type", "summary", "extracted_text", "fields"],
      additionalProperties: false,
    },
  },
};

function getAdminClient() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error("Server misconfigured: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing.");
  }
  return createClient<Database>(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function fetchDocumentAsBase64(filePath: string, mimeType: string | null) {
  const admin = getAdminClient();
  const { data, error } = await admin.storage.from("documents").download(filePath);
  if (error || !data) throw new Error(`Could not download document: ${error?.message ?? "unknown error"}`);

  const arrayBuf = await data.arrayBuffer();
  const buf = Buffer.from(arrayBuf);
  const base64 = buf.toString("base64");
  const mime = mimeType || (data as Blob).type || "application/octet-stream";
  return { base64, mime, sizeBytes: buf.byteLength };
}

export type ExtractionResult = {
  document_type: string;
  summary: string;
  extracted_text: string;
  fields: Record<string, unknown>;
};

export async function runExtraction(filePath: string, mimeType: string | null): Promise<ExtractionResult> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY is not configured.");

  const { base64, mime, sizeBytes } = await fetchDocumentAsBase64(filePath, mimeType);
  if (sizeBytes > 20 * 1024 * 1024) {
    throw new Error("Document is too large for AI extraction (max 20MB).");
  }

  // Gemini accepts both images and PDFs as inline_data via the OpenAI-compatible image_url field.
  const dataUrl = `data:${mime};base64,${base64}`;

  const body = {
    model: MODEL,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: [
          { type: "text", text: "Please extract this document." },
          { type: "image_url", image_url: { url: dataUrl } },
        ],
      },
    ],
    tools: [EXTRACTION_TOOL],
    tool_choice: { type: "function", function: { name: "save_document_extraction" } },
  };

  const res = await fetch(LOVABLE_AI_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 429) throw new Error("AI rate limit reached. Please try again in a minute.");
    if (res.status === 402) throw new Error("AI credits exhausted. Top up Lovable AI in workspace settings.");
    const text = await res.text();
    console.error("Lovable AI error", res.status, text);
    throw new Error(`AI extraction failed (${res.status}).`);
  }

  const json = await res.json();
  const toolCall = json?.choices?.[0]?.message?.tool_calls?.[0];
  const argsString: string | undefined = toolCall?.function?.arguments;
  if (!argsString) {
    console.error("AI returned no tool call", JSON.stringify(json).slice(0, 500));
    throw new Error("AI did not return structured fields.");
  }
  let parsed: ExtractionResult;
  try {
    parsed = JSON.parse(argsString);
  } catch (e) {
    console.error("AI returned invalid JSON", argsString.slice(0, 500));
    throw new Error("AI returned malformed output.");
  }
  return parsed;
}
