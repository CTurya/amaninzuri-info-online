import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-warm bg-secondary/30 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-md bg-card ring-1 ring-warm">
              <img src={logo} alt="Amani Nzuri logo" className="h-full w-full object-cover" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-base font-medium tracking-tight">Amani Nzuri</span>
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Information Management</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm text-muted-foreground leading-relaxed">
            A professional information management consultancy helping South African businesses digitise records, organise data, and move confidently to the cloud.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">100% BEE compliant · Established 2024</p>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link to="/features" className="text-foreground/75 hover:text-foreground">Services</Link></li>
            <li><Link to="/pricing" className="text-foreground/75 hover:text-foreground">Pricing</Link></li>
            <li><Link to="/about" className="text-foreground/75 hover:text-foreground">About</Link></li>
            <li><Link to="/auth" className="text-foreground/75 hover:text-foreground">Client portal</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/75">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-accent" /> 071 241 9994</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-accent" /> amaninzuripty@gmail.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-accent" /> Sunninghill, Johannesburg</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-warm/70 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Amani Nzuri Information Management Consulting. All rights reserved.
      </div>
    </footer>
  );
}
