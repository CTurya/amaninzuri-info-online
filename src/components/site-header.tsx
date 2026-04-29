import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-warm/70 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-card ring-1 ring-warm">
            <img src={logo} alt="Amani Nzuri logo" className="h-full w-full object-cover" />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base font-medium tracking-tight">Amani Nzuri</span>
            <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Information Management</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/features" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Services</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
          <Link to="/about" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>About</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/auth" className="hidden sm:inline-flex items-center rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            Sign in
          </Link>
          <Link
            to="/auth"
            className="inline-flex items-center rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/85 transition-colors"
          >
            Book consultation
          </Link>
        </div>
      </div>
    </header>
  );
}
