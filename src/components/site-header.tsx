import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-rose text-primary-foreground shadow-soft transition-transform group-hover:rotate-12">
            <Flower2 className="h-4 w-4" />
          </span>
          <span className="font-display text-2xl font-medium tracking-tight">Amani Nzuri</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-foreground/70">
          <Link to="/features" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Features</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
          <Link to="/about" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>About</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="hidden sm:inline text-sm text-foreground/70 hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/85 transition-colors shadow-soft"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
