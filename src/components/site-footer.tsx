import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, FolderArchive } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/40 mt-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-rose text-primary-foreground shadow-warm">
              <FolderArchive className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-bold tracking-tight">
                Amani<span className="text-accent">Nzuri</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">Information Management</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
            A professional information management consultancy helping South African businesses digitise records, organise data and move confidently to the cloud.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">100% BEE compliant · POPIA-aligned · Established 2024</p>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/features" className="text-muted-foreground hover:text-accent">Services</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground hover:text-accent">Pricing</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-accent">About</Link></li>
            <li><Link to="/auth" className="text-muted-foreground hover:text-accent">Client portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/80">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent" /> 071 241 9994</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" /> amaninzuripty@gmail.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Sunninghill, Johannesburg</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-muted-foreground">
        © 2025 Amani Nzuri Information Management Consulting. All rights reserved.
      </div>
    </footer>
  );
}

