import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Eye, Target } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Amani Nzuri Information Management Consulting" },
      { name: "description", content: "Amani Nzuri is a South African information management consultancy specialising in digitising and organising business records." },
      { property: "og:title", content: "About Amani Nzuri" },
      { property: "og:description", content: "A professional information management consultancy for SMEs in South Africa." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">About us</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            Who is <span className="italic">Amani Nzuri?</span>
          </h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-6 text-foreground/80 text-lg leading-relaxed">
          <p>
            Amani Nzuri is a professional information management consultancy specialising in digitising and organising business records.
          </p>
          <p>
            We help organisations transition from paper-based systems to efficient, secure, and scalable digital solutions — combining hands-on records expertise with modern cloud tools, all delivered with the personal care SMEs deserve.
          </p>
          <p>
            Established in 2024 and based in Sunninghill, Johannesburg, we are 100% BEE compliant and proudly partner with small and medium businesses across South Africa.
          </p>
        </div>
      </section>

      <section className="py-16 bg-cream/60 border-y border-warm">
        <div className="mx-auto max-w-5xl px-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-card p-8 ring-1 ring-warm shadow-soft">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep">
              <Eye className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl">Our vision</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              To become a trusted leader in digital transformation and information management across Africa.
            </p>
          </div>
          <div className="rounded-3xl bg-card p-8 ring-1 ring-warm shadow-soft">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl">Our mission</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              To empower businesses through efficient, secure, and accessible information systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display italic text-2xl text-rose-deep">
            "Digitising records. Simplifying business."
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
