import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { attachSupabaseAuth } from "./auth-client-middleware";
import type { Database } from "@/integrations/supabase/types";
import { runExtraction } from "@/server/documents.server";

type Json = Database["public"]["Tables"]["documents"]["Update"]["extracted_data"];

const extractInput = z.object({ documentId: z.string().uuid() });

export const extractDocument = createServerFn({ method: "POST" })
  .middleware([attachSupabaseAuth, requireSupabaseAuth])
  .inputValidator((data) => extractInput.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    // Load the document scoped to the caller (RLS also enforces this).
    const { data: doc, error: loadErr } = await supabase
      .from("documents")
      .select("id, file_path, file_type, owner_id, status")
      .eq("id", data.documentId)
      .single();

    if (loadErr || !doc) throw new Error("Document not found.");
    if (doc.owner_id !== userId) throw new Error("Not authorised for this document.");

    // Mark as extracting
    await supabase.from("documents").update({ status: "extracting" }).eq("id", doc.id);

    try {
      const result = await runExtraction(doc.file_path, doc.file_type);

      const extracted_data = {
        document_type: result.document_type,
        summary: result.summary,
        fields: result.fields,
        approved: false,
        extracted_at: new Date().toISOString(),
      };

      const { error: upErr } = await supabase
        .from("documents")
        .update({
          extracted_text: result.extracted_text,
          extracted_data: extracted_data as Json,
          status: "needs_review",
        })
        .eq("id", doc.id);

      if (upErr) throw new Error(upErr.message);
      return { ok: true as const };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown extraction error";
      await supabase
        .from("documents")
        .update({
          status: "failed",
          extracted_data: { error: message, extracted_at: new Date().toISOString(), approved: false } as Json,
        })
        .eq("id", doc.id);
      throw new Error(message);
    }
  });

const saveInput = z.object({
  documentId: z.string().uuid(),
  document_type: z.string().min(1).max(120),
  summary: z.string().max(2000),
  extracted_text: z.string().max(200_000),
  fields: z.record(z.string().min(1).max(120), z.any()),
  approve: z.boolean().optional(),
});

export const saveExtraction = createServerFn({ method: "POST" })
  .middleware([attachSupabaseAuth, requireSupabaseAuth])
  .inputValidator((data) => saveInput.parse(data))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;

    const { data: doc, error: loadErr } = await supabase
      .from("documents")
      .select("id, owner_id, extracted_data")
      .eq("id", data.documentId)
      .single();
    if (loadErr || !doc) throw new Error("Document not found.");
    if (doc.owner_id !== userId) throw new Error("Not authorised for this document.");

    const previous = (doc.extracted_data as Record<string, unknown> | null) ?? {};
    const extracted_data = {
      ...previous,
      document_type: data.document_type,
      summary: data.summary,
      fields: data.fields,
      approved: !!data.approve,
      reviewed_at: new Date().toISOString(),
    };

    const { error: upErr } = await supabase
      .from("documents")
      .update({
        extracted_text: data.extracted_text,
        extracted_data: extracted_data as Json,
        status: data.approve ? "approved" : "needs_review",
      })
      .eq("id", doc.id);

    if (upErr) throw new Error(upErr.message);
    return { ok: true as const };
  });
