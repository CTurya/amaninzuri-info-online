import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { extractDocument } from "@/lib/documents.functions";
import { Upload, FileText, Sparkles, Trash2, Download, ChevronRight, RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/documents")({
  component: DocumentsPage,
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
};

type ClientOption = { id: string; name: string };

function DocumentsPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [clients, setClients] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const extract = useServerFn(extractDocument);

  async function load() {
    setLoading(true);
    const [docsRes, clientsRes] = await Promise.all([
      supabase.from("documents").select("*").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").order("name"),
    ]);
    if (docsRes.error) toast.error(docsRes.error.message);
    else setDocs(docsRes.data ?? []);
    setClients(clientsRes.data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleUpload(file: File) {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;
    if (file.size > 20 * 1024 * 1024) { toast.error("File too large (max 20MB for AI extraction)"); return; }

    setUploading(true);
    const path = `${userData.user.id}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error: upErr } = await supabase.storage.from("documents").upload(path, file);
    if (upErr) { toast.error(upErr.message); setUploading(false); return; }

    const { data: inserted, error: dbErr } = await supabase.from("documents").insert({
      owner_id: userData.user.id,
      file_name: file.name,
      file_path: path,
      file_type: file.type,
      file_size: file.size,
      status: "pending",
    }).select("id").single();
    setUploading(false);
    if (dbErr || !inserted) { toast.error(dbErr?.message ?? "Upload failed"); return; }

    toast.success("Uploaded — running AI extraction…");
    await load();

    // Fire-and-forget extraction; user can keep working.
    extract({ data: { documentId: inserted.id } })
      .then(() => { toast.success(`AI ready: ${file.name}`); load(); })
      .catch((e) => { toast.error(`Extraction failed: ${e instanceof Error ? e.message : "unknown"}`); load(); });
  }

  async function handleDelete(e: React.MouseEvent, doc: Doc) {
    e.preventDefault(); e.stopPropagation();
    if (!confirm(`Delete ${doc.file_name}?`)) return;
    await supabase.storage.from("documents").remove([doc.file_path]);
    const { error } = await supabase.from("documents").delete().eq("id", doc.id);
    if (error) toast.error(error.message);
    else { toast.success("Deleted"); load(); }
  }

  async function handleDownload(e: React.MouseEvent, doc: Doc) {
    e.preventDefault(); e.stopPropagation();
    const { data, error } = await supabase.storage.from("documents").createSignedUrl(doc.file_path, 60);
    if (error || !data) { toast.error("Couldn't open file"); return; }
    window.open(data.signedUrl, "_blank");
  }

  async function handleAssign(e: React.ChangeEvent<HTMLSelectElement>, doc: Doc) {
    e.stopPropagation();
    const clientId = e.target.value;
    const { error } = await supabase.from("documents").update({ client_id: clientId || null }).eq("id", doc.id);
    if (error) toast.error(error.message);
    else { toast.success("Linked"); load(); }
  }

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">Documents</h1>
          <p className="mt-2 text-foreground/70">Drop in receipts, contracts, anything — AI extracts the details automatically.</p>
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleUpload(f); }}
        className="mt-8 rounded-3xl border-2 border-dashed border-warm bg-gradient-warm p-12 text-center cursor-pointer hover:bg-blush/40 transition-colors"
        onClick={() => inputRef.current?.click()}
      >
        <input ref={inputRef} type="file" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); e.target.value = ""; }} accept="image/*,application/pdf,.doc,.docx,.txt" />
        <div className="grid h-14 w-14 mx-auto place-items-center rounded-2xl bg-card shadow-soft">
          <Upload className="h-6 w-6 text-rose-deep" />
        </div>
        <h3 className="mt-4 font-display text-xl">{uploading ? "Uploading..." : "Drop a file here"}</h3>
        <p className="mt-1 text-sm text-foreground/60">or click to browse · PDF, images, docs · max 20MB · AI auto-extracts</p>
      </div>

      <div className="mt-8">
        {loading ? (
          <p className="text-foreground/50 py-8 text-center">Loading...</p>
        ) : docs.length === 0 ? (
          <p className="text-foreground/50 py-8 text-center">No documents yet.</p>
        ) : (
          <div className="space-y-2">
            {docs.map((d) => (
              <Link
                key={d.id}
                to="/app/documents/$id"
                params={{ id: d.id }}
                className="block rounded-2xl bg-card p-4 ring-1 ring-warm flex items-center gap-4 hover:shadow-card transition-shadow"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blush text-rose-deep">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{d.file_name}</p>
                  <p className="text-xs text-foreground/60 mt-0.5 flex items-center gap-2 flex-wrap">
                    <span>{formatSize(d.file_size)} · {new Date(d.created_at).toLocaleDateString()}</span>
                    <StatusPill status={d.status} />
                  </p>
                </div>
                <select
                  value={d.client_id ?? ""}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => handleAssign(e, d)}
                  className="hidden sm:block text-xs px-3 py-1.5 rounded-full bg-background border border-warm focus:outline-none"
                >
                  <option value="">Unassigned</option>
                  {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button
                  onClick={(e) => {
                    e.preventDefault(); e.stopPropagation();
                    toast.info("Re-running AI extraction…");
                    extract({ data: { documentId: d.id } })
                      .then(() => { toast.success(`AI ready: ${d.file_name}`); load(); })
                      .catch((err) => { toast.error(`Extraction failed: ${err instanceof Error ? err.message : "unknown"}`); load(); });
                  }}
                  className="p-2 rounded-full hover:bg-background text-foreground/60 hover:text-foreground"
                  title="Re-run AI extraction"
                >
                  <RefreshCw className="h-4 w-4" />
                </button>
                <button onClick={(e) => handleDownload(e, d)} className="p-2 rounded-full hover:bg-background text-foreground/60 hover:text-foreground" title="Open">
                  <Download className="h-4 w-4" />
                </button>
                <button onClick={(e) => handleDelete(e, d)} className="p-2 rounded-full hover:bg-destructive/10 text-foreground/60 hover:text-destructive" title="Delete">
                  <Trash2 className="h-4 w-4" />
                </button>
                <ChevronRight className="h-4 w-4 text-foreground/30" />

              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, { label: string; icon: React.ComponentType<{ className?: string }>; className: string }> = {
    pending: { label: "Pending", icon: FileText, className: "bg-muted text-foreground/60" },
    extracting: { label: "AI reading…", icon: RefreshCw, className: "bg-blush text-rose-deep" },
    needs_review: { label: "Needs review", icon: Sparkles, className: "bg-blush text-rose-deep" },
    approved: { label: "Approved", icon: CheckCircle2, className: "bg-rose-deep text-primary-foreground" },
    failed: { label: "Failed", icon: AlertCircle, className: "bg-destructive/15 text-destructive" },
  };
  const m = map[status] ?? map.pending;
  const Icon = m.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium uppercase tracking-wider ${m.className}`}>
      <Icon className={`h-3 w-3 ${status === "extracting" ? "animate-spin" : ""}`} /> {m.label}
    </span>
  );
}

function formatSize(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
