import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.jpg";

export function SiteHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-card ring-1 ring-warm shadow-soft">
            <img src={logo} alt="Amani Nzuri logo" className="h-full w-full object-cover" />
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-lg font-medium tracking-tight">Amani Nzuri</span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/60">Information Management</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm text-foreground/70">
          <Link to="/features" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Services</Link>
          <Link to="/pricing" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Packages</Link>
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
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}
