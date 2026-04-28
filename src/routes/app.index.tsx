import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, Sparkles, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/app/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [stats, setStats] = useState({ clients: 0, documents: 0, processed: 0 });
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;
      const { data: profile } = await supabase.from("profiles").select("display_name").eq("id", userData.user.id).maybeSingle();
      setName(profile?.display_name || userData.user.email?.split("@")[0] || "");

      const [clientsRes, docsRes, processedRes] = await Promise.all([
        supabase.from("clients").select("*", { count: "exact", head: true }),
        supabase.from("documents").select("*", { count: "exact", head: true }),
        supabase.from("documents").select("*", { count: "exact", head: true }).eq("status", "processed"),
      ]);
      setStats({
        clients: clientsRes.count ?? 0,
        documents: docsRes.count ?? 0,
        processed: processedRes.count ?? 0,
      });
    })();
  }, []);

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div>
      <div>
        <p className="text-sm text-foreground/60">{greeting},</p>
        <h1 className="font-display text-4xl sm:text-5xl mt-1">{name || "friend"}.</h1>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <StatCard icon={Users} label="Clients" value={stats.clients} tint="rose" />
        <StatCard icon={FileText} label="Documents" value={stats.documents} tint="sage" />
        <StatCard icon={Sparkles} label="Processed by AI" value={stats.processed} tint="terracotta" />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <ActionCard
          to="/app/clients"
          title="Add a client"
          desc="Start a new client record with notes and contact details."
        />
        <ActionCard
          to="/app/documents"
          title="Upload a document"
          desc="Drop a file in. Petal will read it and extract the details."
        />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, tint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: number; tint: "rose" | "sage" | "terracotta" }) {
  const tintClass = tint === "rose" ? "bg-blush text-rose-deep" : tint === "sage" ? "bg-accent/40 text-accent-foreground" : "bg-[oklch(0.88_0.05_40)] text-[oklch(0.4_0.1_40)]";
  return (
    <div className="rounded-3xl bg-card p-6 ring-1 ring-warm shadow-soft">
      <div className={`grid h-10 w-10 place-items-center rounded-2xl ${tintClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-sm text-foreground/60">{label}</p>
      <p className="font-display text-4xl mt-1">{value}</p>
    </div>
  );
}

function ActionCard({ to, title, desc }: { to: string; title: string; desc: string }) {
  return (
    <Link to={to} className="group rounded-3xl bg-gradient-warm p-7 ring-1 ring-warm shadow-soft hover:shadow-card transition-all">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl">{title}</h3>
          <p className="mt-2 text-sm text-foreground/70">{desc}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-foreground/50 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
