import { Link } from "@tanstack/react-router";
import { ArrowRight, FolderArchive } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30">
      {/* Announcement bar */}
      <div className="bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="hidden sm:inline">📣 Now offering free 30-min discovery consultations for SMEs —</span>
          <Link to="/book" className="text-accent font-medium inline-flex items-center gap-1 hover:underline">
            Book yours <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Floating pill nav */}
      <div className="px-4 lg:px-10 pt-4">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-card/70 backdrop-blur-xl px-3 py-2 pl-5 shadow-card">
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-rose text-primary-foreground shadow-warm">
                <FolderArchive className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="font-display text-base font-bold tracking-tight">
                  Amani<span className="text-accent">Nzuri</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Information Management</span>
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-foreground transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>Home</Link>
              <Link to="/features" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Services</Link>
              <Link to="/pricing" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>Pricing</Link>
              <Link to="/about" className="hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>About</Link>
            </nav>

            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm hover:opacity-95 transition-opacity"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
