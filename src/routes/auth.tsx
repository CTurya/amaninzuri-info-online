import { createFileRoute, useNavigate, Link, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Flower2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — Petal" },
      { name: "description", content: "Sign in or create your free Petal account." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) navigate({ to: "/app" });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/app" });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + "/app",
            data: { display_name: name || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Welcome to Petal!", { description: "Your garden is ready." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-soft grid lg:grid-cols-2">
      <div className="hidden lg:flex relative items-end p-12 bg-gradient-rose text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-20" aria-hidden style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 50%), radial-gradient(circle at 80% 70%, white 0%, transparent 50%)" }} />
        <div className="relative z-10 max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-background/20 backdrop-blur"><Flower2 className="h-4 w-4" /></span>
            <span className="font-display text-2xl">Petal</span>
          </Link>
          <h2 className="font-display text-4xl leading-tight">
            "Petal turned my receipt drawer into a searchable archive in an afternoon."
          </h2>
          <p className="mt-6 text-primary-foreground/80">— Mae, ceramics studio owner</p>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-rose text-primary-foreground"><Flower2 className="h-4 w-4" /></span>
            <span className="font-display text-2xl">Petal</span>
          </Link>
          <h1 className="font-display text-4xl font-medium">
            {mode === "signin" ? "Welcome back" : "Create your garden"}
          </h1>
          <p className="mt-2 text-foreground/70">
            {mode === "signin" ? "Sign in to your records." : "Free for your first 25 clients."}
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "signup" && (
              <Field label="Your name">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  required
                  className="auth-input"
                  placeholder="Jane Doe"
                />
              </Field>
            )}
            <Field label="Email">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                className="auth-input"
                placeholder="you@studio.com"
              />
            </Field>
            <Field label="Password">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                minLength={8}
                className="auth-input"
                placeholder="At least 8 characters"
              />
            </Field>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors disabled:opacity-60"
            >
              {loading ? "..." : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-foreground/70">
            {mode === "signin" ? "New to Petal?" : "Already have an account?"}{" "}
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="font-medium text-rose-deep hover:underline"
            >
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      <style>{`
        .auth-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.875rem;
          background: var(--color-card);
          border: 1px solid var(--color-border);
          font-size: 0.95rem;
          transition: all 0.15s;
        }
        .auth-input:focus {
          outline: none;
          border-color: var(--color-ring);
          box-shadow: 0 0 0 3px oklch(0.62 0.13 15 / 0.15);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium uppercase tracking-wider text-foreground/60 mb-2">{label}</span>
      {children}
    </label>
  );
}
