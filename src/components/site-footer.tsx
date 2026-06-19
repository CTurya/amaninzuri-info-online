import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpg";

export function SiteFooter() {
  return (
    <footer className="border-t border-warm bg-cream/50 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-card ring-1 ring-warm">
              <img src={logo} alt="Amani Nzuri logo" className="h-full w-full object-cover" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-display text-xl">Amani Nzuri</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-foreground/60">Information Management Consulting</span>
            </span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            A professional information management consultancy helping South African businesses digitise records, organise data, and move confidently to the cloud.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">100% BEE compliant · Established 2024</p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/features" className="text-foreground/70 hover:text-foreground">Services</Link></li>
            <li><Link to="/pricing" className="text-foreground/70 hover:text-foreground">Packages & rates</Link></li>
            <li><Link to="/about" className="text-foreground/70 hover:text-foreground">About us</Link></li>
            <li><Link to="/book" className="text-foreground/70 hover:text-foreground">Book consultation</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-foreground/70">
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-rose-deep" /> 071 241 9994</li>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-rose-deep" /> amaninzuripty@gmail.com</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-rose-deep" /> Sunninghill, Johannesburg</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-warm/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Amani Nzuri Information Management Consulting. All rights reserved.
      </div>
    </footer>
  );
}
