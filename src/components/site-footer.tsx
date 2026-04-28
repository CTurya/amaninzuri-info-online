import { Link } from "@tanstack/react-router";
import { Flower2 } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-warm bg-cream/50 mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-rose text-primary-foreground">
              <Flower2 className="h-4 w-4" />
            </span>
            <span className="font-display text-2xl">Amani Nzuri</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Beautifully simple client record-keeping for small business owners who'd rather be doing the work they love.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Product</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/features" className="text-foreground/70 hover:text-foreground">Features</Link></li>
            <li><Link to="/pricing" className="text-foreground/70 hover:text-foreground">Pricing</Link></li>
            <li><Link to="/auth" className="text-foreground/70 hover:text-foreground">Sign in</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground/60">Company</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="text-foreground/70 hover:text-foreground">About</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-warm/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Amani Nzuri Information Management Consulting. Made with care.
      </div>
    </footer>
  );
}
