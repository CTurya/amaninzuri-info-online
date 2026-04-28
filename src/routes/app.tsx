import { createFileRoute, Outlet, Link, useNavigate, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flower2, Users, FileText, LogOut, LayoutDashboard } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (!session) navigate({ to: "/auth" });
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
      if (!data.session) navigate({ to: "/auth" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  if (loading) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <Flower2 className="h-8 w-8 text-rose-deep animate-pulse" />
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 w-64 border-r border-warm bg-cream/60 hidden md:flex flex-col p-6">
        <Link to="/" className="flex items-center gap-2 mb-10">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-rose text-primary-foreground"><Flower2 className="h-4 w-4" /></span>
          <span className="font-display text-2xl">Petal</span>
        </Link>
        <nav className="space-y-1 flex-1">
          <NavItem to="/app" icon={LayoutDashboard} label="Dashboard" exact />
          <NavItem to="/app/clients" icon={Users} label="Clients" />
          <NavItem to="/app/documents" icon={FileText} label="Documents" />
        </nav>
        <div className="border-t border-warm pt-4">
          <p className="text-xs text-muted-foreground mb-2 truncate">{user.email}</p>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </aside>
      <div className="md:pl-64">
        <MobileNav onSignOut={handleSignOut} email={user.email ?? ""} />
        <main className="px-6 lg:px-10 py-8 lg:py-12 max-w-6xl">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function NavItem({ to, icon: Icon, label, exact }: { to: string; icon: React.ComponentType<{ className?: string }>; label: string; exact?: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: !!exact }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-foreground/70 hover:bg-card hover:text-foreground transition-colors"
      activeProps={{ className: "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm bg-card text-foreground font-medium shadow-soft" }}
    >
      <Icon className="h-4 w-4" /> {label}
    </Link>
  );
}

function MobileNav({ onSignOut, email }: { onSignOut: () => void; email: string }) {
  return (
    <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-warm bg-cream/60">
      <Link to="/" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-rose text-primary-foreground"><Flower2 className="h-3.5 w-3.5" /></span>
        <span className="font-display text-xl">Petal</span>
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/app/clients" className="text-sm">Clients</Link>
        <Link to="/app/documents" className="text-sm">Docs</Link>
        <button onClick={onSignOut}><LogOut className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
