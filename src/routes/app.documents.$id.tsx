import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { extractDocument, saveExtraction } from "@/server/documents.functions";
import {
  ArrowLeft, Sparkles, Save, CheckCircle2, RefreshCw, Plus, Trash2, FileText, AlertCircle, Download,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/documents/$id")({
  component: DocumentDetailPage,
});

type Doc = {
  id: string;
  file_name: string;
  file_path: string;
  file_type: string | null;
  file_size: number | null;
  status: string;
  created_at: string;
  client_id: string | null;
  extracted_text: string | null;
  extracted_data: ExtractionData | null;
};

type ExtractionData = {
  document_type?: string;
  summary?: string;
  fields?: Record<string, unknown>;
  approved?: boolean;
  error?: string;
  extracted_at?: string;
  reviewed_at?: string;
};

type FieldRow = { key: string; value: string };

function DocumentDetailPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const extract = useServerFn(extractDocument);
  const save = useServerFn(saveExtraction);

  const [doc, setDoc] = useState<Doc | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<"" | "extract" | "save" | "approve">("");
  const [docType, setDocType] = useState("");
  const [summary, setSummary] = useState("");
  const [text, setText] = useState("");
  const [fields, setFields] = useState<FieldRow[]>([]);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("id", id)
      .single();
    setLoading(false);
    if (error || !data) {
      toast.error(error?.message ?? "Document not found");
      navigate({ to: "/app/documents" });
      return;
    }
    const d = data as unknown as Doc;
    setDoc(d);
    const ed = d.extracted_data ?? {};
    setDocType(ed.document_type ?? "");
    setSummary(ed.summary ?? "");
    setText(d.extracted_text ?? "");
    setFields(toFieldRows(ed.fields));
  }

  useEffect(() => { load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [id]);

  async function handleExtract() {
    if (!doc) return;
    setBusy("extract");
    try {
      await extract({ data: { documentId: doc.id } });
      toast.success("AI extraction complete — please review");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Extraction failed");
      await load();
    } finally {
      setBusy("");
    }
  }

  async function handleSave(approve: boolean) {
    if (!doc) return;
    setBusy(approve ? "approve" : "save");
    try {
      await save({
        data: {
          documentId: doc.id,
          document_type: docType || "Other",
          summary,
          extracted_text: text,
          fields: fromFieldRows(fields),
          approve,
        },
      });
      toast.success(approve ? "Approved & saved" : "Changes saved");
      await load();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy("");
    }
  }

  async function handleDownload() {
    if (!doc) return;
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(doc.file_path, 60);
    if (error || !data) { toast.error("Couldn't open file"); return; }
    window.open(data.signedUrl, "_blank");
  }

  if (loading || !doc) {
    return <p className="text-foreground/50 py-12 text-center">Loading…</p>;
  }

  const ed = doc.extracted_data ?? {};
  const hasExtraction = !!doc.extracted_text || !!ed.summary;
  const isApproved = doc.status === "approved";

  return (
    <div className="space-y-8">
      <div>
        <Link to="/app/documents" className="inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to documents
        </Link>
        <div className="mt-3 flex items-start gap-4 flex-wrap">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blush text-rose-deep">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="font-display text-3xl sm:text-4xl break-words">{doc.file_name}</h1>
            <p className="mt-1 text-sm text-foreground/60">
              {formatSize(doc.file_size)} · uploaded {new Date(doc.created_at).toLocaleDateString()} · <StatusBadge status={doc.status} />
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleDownload} className="inline-flex items-center gap-2 rounded-full border border-warm bg-card px-4 py-2 text-sm hover:bg-cream">
              <Download className="h-4 w-4" /> Open file
            </button>
          </div>
        </div>
      </div>

      {!hasExtraction && doc.status !== "extracting" && (
        <div className="rounded-3xl bg-card ring-1 ring-warm p-8 text-center">
          <div className="grid h-12 w-12 mx-auto place-items-center rounded-2xl bg-blush text-rose-deep">
            <Sparkles className="h-5 w-5" />
          </div>
          <h2 className="mt-4 font-display text-xl">Run AI extraction</h2>
          <p className="mt-2 text-sm text-foreground/70 max-w-md mx-auto">
            Lovable AI will read the document, transcribe the text and pull out key fields. You'll get to review and approve before it's marked done.
          </p>
          <button
            onClick={handleExtract}
            disabled={busy === "extract"}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/85 disabled:opacity-60"
          >
            {busy === "extract" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {busy === "extract" ? "Extracting…" : "Extract with AI"}
          </button>
        </div>
      )}

      {doc.status === "extracting" && (
        <div className="rounded-3xl bg-card ring-1 ring-warm p-8 text-center">
          <RefreshCw className="h-6 w-6 mx-auto animate-spin text-rose-deep" />
          <p className="mt-4 text-sm text-foreground/70">AI is reading this document. This usually takes 5–20 seconds.</p>
          <button onClick={load} className="mt-4 text-xs underline text-foreground/60">Refresh</button>
        </div>
      )}

      {doc.status === "failed" && ed.error && (
        <div className="rounded-3xl bg-destructive/10 ring-1 ring-destructive/30 p-6 flex gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-medium text-destructive">Extraction failed</p>
            <p className="mt-1 text-sm text-foreground/70">{ed.error}</p>
            <button
              onClick={handleExtract}
              disabled={busy === "extract"}
              className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-xs text-background hover:bg-foreground/85"
            >
              <RefreshCw className="h-3 w-3" /> Try again
            </button>
          </div>
        </div>
      )}

      {hasExtraction && (
        <>
          <section className="rounded-3xl bg-card ring-1 ring-warm p-6 space-y-5">
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h2 className="font-display text-xl flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-rose-deep" /> Extracted information
              </h2>
              <button
                onClick={handleExtract}
                disabled={busy === "extract"}
                className="text-xs inline-flex items-center gap-1.5 rounded-full border border-warm px-3 py-1.5 hover:bg-cream"
              >
                <RefreshCw className={`h-3 w-3 ${busy === "extract" ? "animate-spin" : ""}`} /> Re-run
              </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Document type">
                <input
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full rounded-xl border border-warm bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
                />
              </Field>
              <Field label="Summary">
                <textarea
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-warm bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
                />
              </Field>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Key fields</p>
                <button
                  type="button"
                  onClick={() => setFields((f) => [...f, { key: "", value: "" }])}
                  className="text-xs inline-flex items-center gap-1 text-rose-deep hover:underline"
                >
                  <Plus className="h-3 w-3" /> Add field
                </button>
              </div>
              {fields.length === 0 ? (
                <p className="text-sm text-foreground/50 italic">No fields extracted.</p>
              ) : (
                <div className="space-y-2">
                  {fields.map((row, idx) => (
                    <div key={idx} className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_auto] gap-2 items-start">
                      <input
                        value={row.key}
                        onChange={(e) => updateField(setFields, idx, { key: e.target.value })}
                        placeholder="field_name"
                        className="rounded-lg border border-warm bg-background px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
                      />
                      <textarea
                        value={row.value}
                        onChange={(e) => updateField(setFields, idx, { value: e.target.value })}
                        rows={1}
                        className="rounded-lg border border-warm bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
                      />
                      <button
                        type="button"
                        onClick={() => setFields((f) => f.filter((_, i) => i !== idx))}
                        className="p-2 rounded-lg text-foreground/50 hover:text-destructive hover:bg-destructive/10"
                        title="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="rounded-3xl bg-card ring-1 ring-warm p-6 space-y-3">
            <h2 className="font-display text-xl">Transcribed text</h2>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={14}
              className="w-full rounded-xl border border-warm bg-background px-3 py-3 text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-rose-deep/30"
            />
          </section>

          <div className="flex flex-wrap items-center gap-3 sticky bottom-4 rounded-3xl bg-card/95 backdrop-blur ring-1 ring-warm p-4 shadow-card">
            {isApproved ? (
              <span className="inline-flex items-center gap-2 text-sm text-rose-deep font-medium">
                <CheckCircle2 className="h-4 w-4" /> Approved on {ed.reviewed_at ? new Date(ed.reviewed_at).toLocaleString() : "—"}
              </span>
            ) : (
              <span className="text-sm text-foreground/60">Review the extraction, then approve to mark this document done.</span>
            )}
            <div className="ml-auto flex gap-2">
              <button
                onClick={() => handleSave(false)}
                disabled={!!busy}
                className="inline-flex items-center gap-2 rounded-full border border-warm bg-background px-5 py-2.5 text-sm hover:bg-cream disabled:opacity-60"
              >
                {busy === "save" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                Save changes
              </button>
              <button
                onClick={() => handleSave(true)}
                disabled={!!busy}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-warm hover:opacity-90 disabled:opacity-60"
              >
                {busy === "approve" ? <RefreshCw className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
                {isApproved ? "Re-approve" : "Approve"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "bg-muted text-foreground/60" },
    extracting: { label: "Extracting…", className: "bg-blush text-rose-deep" },
    needs_review: { label: "Needs review", className: "bg-blush text-rose-deep" },
    approved: { label: "Approved", className: "bg-rose-deep text-primary-foreground" },
    failed: { label: "Failed", className: "bg-destructive/15 text-destructive" },
  };
  const m = map[status] ?? { label: status, className: "bg-muted text-foreground/60" };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${m.className}`}>{m.label}</span>;
}

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function toFieldRows(fields: Record<string, unknown> | undefined): FieldRow[] {
  if (!fields || typeof fields !== "object") return [];
  return Object.entries(fields).map(([key, value]) => ({
    key,
    value: typeof value === "string" ? value : JSON.stringify(value, null, 2),
  }));
}

function fromFieldRows(rows: FieldRow[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const { key, value } of rows) {
    const k = key.trim();
    if (!k) continue;
    const v = value.trim();
    if (v.startsWith("{") || v.startsWith("[")) {
      try { out[k] = JSON.parse(v); continue; } catch { /* fall through */ }
    }
    out[k] = value;
  }
  return out;
}

function updateField(setFields: React.Dispatch<React.SetStateAction<FieldRow[]>>, idx: number, patch: Partial<FieldRow>) {
  setFields((f) => f.map((row, i) => (i === idx ? { ...row, ...patch } : row)));
}
