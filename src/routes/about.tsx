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

      <section className="pt-36 pb-16 border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">About</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight text-balance">
            A consultancy built for <span className="italic text-accent">modern records.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70 leading-relaxed">
            Amani Nzuri is a professional information management consultancy specialising in digitising and organising business records for South African SMEs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 grid gap-12 md:grid-cols-3">
          <div className="md:col-span-2 space-y-5 text-foreground/75 text-base leading-relaxed">
            <p>
              We help organisations transition from paper-based systems to efficient, secure, and scalable digital solutions — combining hands-on records expertise with modern cloud tools.
            </p>
            <p>
              Established in 2024 and based in Sunninghill, Johannesburg, we are 100% BEE compliant and proudly partner with small and medium businesses across South Africa.
            </p>
          </div>
          <div className="space-y-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Founded</p>
              <p className="mt-1 font-medium">2024</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Based in</p>
              <p className="mt-1 font-medium">Sunninghill, Johannesburg</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Compliance</p>
              <p className="mt-1 font-medium">100% BEE · POPIA aligned</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-border/60 bg-muted/30">
        <div className="mx-auto max-w-5xl px-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-card p-8 border border-border">
            <Eye className="h-5 w-5 text-accent" />
            <h2 className="mt-5 font-display text-2xl">Our vision</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              To become a trusted leader in digital transformation and information management across Africa.
            </p>
          </div>
          <div className="rounded-xl bg-card p-8 border border-border">
            <Target className="h-5 w-5 text-accent" />
            <h2 className="mt-5 font-display text-2xl">Our mission</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              To empower businesses through efficient, secure, and accessible information systems.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-display italic text-2xl text-accent">
            "Digitising records. Simplifying business."
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
