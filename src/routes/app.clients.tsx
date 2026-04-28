import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Search, Mail, Phone, Building2, X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/app/clients")({
  component: ClientsPage,
});

const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
});

type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  notes: string | null;
  tags: string[] | null;
  created_at: string;
};

function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("clients")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    else setClients(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  const filtered = clients.filter((c) => {
    const q = search.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || (c.email ?? "").toLowerCase().includes(q) || (c.company ?? "").toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-4xl sm:text-5xl">Clients</h1>
          <p className="mt-2 text-foreground/70">Your people, in one calm place.</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors"
        >
          <Plus className="h-4 w-4" /> New client
        </button>
      </div>

      <div className="mt-8 relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email, company..."
          className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-warm text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="mt-6">
        {loading ? (
          <p className="text-foreground/50 py-12 text-center">Loading...</p>
        ) : filtered.length === 0 ? (
          <EmptyState onAdd={() => setOpen(true)} hasClients={clients.length > 0} />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((c) => <ClientCard key={c.id} client={c} />)}
          </div>
        )}
      </div>

      {open && <NewClientModal onClose={() => setOpen(false)} onCreated={() => { setOpen(false); load(); }} />}
    </div>
  );
}

function ClientCard({ client }: { client: Client }) {
  const initial = client.name.charAt(0).toUpperCase();
  return (
    <div className="rounded-2xl bg-card p-5 ring-1 ring-warm shadow-soft hover:shadow-card transition-all">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-rose text-primary-foreground font-display text-lg">
          {initial}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-medium truncate">{client.name}</h3>
          {client.company && <p className="text-xs text-foreground/60 flex items-center gap-1 mt-0.5"><Building2 className="h-3 w-3" />{client.company}</p>}
        </div>
      </div>
      <div className="mt-4 space-y-1.5 text-xs text-foreground/70">
        {client.email && <div className="flex items-center gap-2 truncate"><Mail className="h-3 w-3 shrink-0" />{client.email}</div>}
        {client.phone && <div className="flex items-center gap-2"><Phone className="h-3 w-3 shrink-0" />{client.phone}</div>}
      </div>
      {client.notes && <p className="mt-4 text-xs text-foreground/60 line-clamp-2 italic">"{client.notes}"</p>}
    </div>
  );
}

function EmptyState({ onAdd, hasClients }: { onAdd: () => void; hasClients: boolean }) {
  return (
    <div className="rounded-3xl bg-gradient-warm p-12 text-center ring-1 ring-warm">
      <h3 className="font-display text-2xl">{hasClients ? "No matches" : "No clients yet"}</h3>
      <p className="mt-2 text-foreground/70 max-w-sm mx-auto">
        {hasClients ? "Try a different search." : "Plant your first client record to get started."}
      </p>
      {!hasClients && (
        <button onClick={onAdd} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background hover:bg-foreground/85">
          <Plus className="h-4 w-4" /> Add your first client
        </button>
      )}
    </div>
  );
}

function NewClientModal({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = clientSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) { setSaving(false); return; }
    const { error } = await supabase.from("clients").insert({
      owner_id: userData.user.id,
      name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      company: parsed.data.company || null,
      notes: parsed.data.notes || null,
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else { toast.success("Client added"); onCreated(); }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/30 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-md rounded-3xl bg-card p-6 shadow-warm ring-1 ring-warm" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">New client</h2>
          <button onClick={onClose} className="text-foreground/50 hover:text-foreground"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <ModalField label="Name" required>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="modal-input" placeholder="Jane Doe" />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Email">
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="modal-input" placeholder="jane@..." />
            </ModalField>
            <ModalField label="Phone">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="modal-input" placeholder="+1..." />
            </ModalField>
          </div>
          <ModalField label="Company">
            <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="modal-input" placeholder="Acme Studio" />
          </ModalField>
          <ModalField label="Notes">
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} className="modal-input resize-none" placeholder="Anything you want to remember..." />
          </ModalField>
          <button type="submit" disabled={saving} className="w-full mt-2 rounded-full bg-foreground py-3 text-sm font-medium text-background hover:bg-foreground/85 disabled:opacity-60">
            {saving ? "Saving..." : "Add client"}
          </button>
        </form>
        <style>{`.modal-input{width:100%;padding:0.65rem 0.9rem;border-radius:0.75rem;background:var(--color-background);border:1px solid var(--color-border);font-size:0.9rem;}.modal-input:focus{outline:none;border-color:var(--color-ring);box-shadow:0 0 0 3px oklch(0.62 0.13 15 / 0.15);}`}</style>
      </div>
    </div>
  );
}

function ModalField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-1.5">
        {label}{required && <span className="text-rose-deep ml-1">*</span>}
      </span>
      {children}
    </label>
  );
}
