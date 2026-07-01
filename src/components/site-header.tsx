import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import logo from "@/assets/logo.jpg";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { to: "/features", label: "Services" },
  { to: "/pricing", label: "Packages" },
  { to: "/about", label: "About" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

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
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/book"
            className="hidden sm:inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:bg-foreground/85 transition-colors shadow-soft"
          >
            Book Consultation
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="md:hidden grid h-10 w-10 place-items-center rounded-full bg-card ring-1 ring-warm shadow-soft"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-4/5 flex flex-col gap-1">
              <SheetTitle className="font-display text-lg">Amani Nzuri</SheetTitle>
              <nav className="mt-6 flex flex-col gap-1 text-base">
                {NAV_LINKS.map((link) => (
                  <SheetClose asChild key={link.to}>
                    <Link
                      to={link.to}
                      className="rounded-lg px-3 py-3 text-foreground/80 hover:bg-cream hover:text-foreground transition-colors"
                      activeProps={{ className: "text-foreground bg-cream" }}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <SheetClose asChild>
                <Link
                  to="/book"
                  className="mt-4 inline-flex items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background hover:bg-foreground/85 transition-colors shadow-soft"
                  onClick={() => setOpen(false)}
                >
                  Book Consultation
                </Link>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
