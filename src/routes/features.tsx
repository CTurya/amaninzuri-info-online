import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Cloud, Database, FileSearch, FolderHeart, GraduationCap, ShieldCheck, Workflow, Sparkles } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Services — Amani Nzuri Information Management Consulting" },
      { name: "description", content: "Document digitisation, records management, cloud migration, custom dashboards, workflow automation, POPIA compliance and staff training." },
      { property: "og:title", content: "Services — Amani Nzuri" },
      { property: "og:description", content: "End-to-end information management services for South African SMEs." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const documentMgmt = [
    { icon: FileSearch, title: "Document Digitisation & Scanning", desc: "Convert paper records into clean, searchable digital files — quickly and securely." },
    { icon: FolderHeart, title: "Records Management Solutions", desc: "Structured, compliant systems for storing, retrieving and retaining your records." },
    { icon: Cloud, title: "Cloud Storage Setup & Migration", desc: "Move your business data into the cloud with a structure designed for how you work." },
    { icon: Sparkles, title: "Data Capture & Cleanup", desc: "Accurate data entry, deduplication and clean-up so your records are reliable." },
  ];
  const infoMgmt = [
    { icon: Workflow, title: "Workflow Automation", desc: "Automate repetitive admin tasks and free your team to focus on higher-value work." },
    { icon: Database, title: "Custom Databases & Dashboards", desc: "Bespoke databases and reporting dashboards built around your business needs." },
    { icon: ShieldCheck, title: "POPIA Compliance Support", desc: "Practical guidance and controls to keep you compliant with South African data law." },
    { icon: GraduationCap, title: "Staff Training & Support", desc: "Hands-on training and ongoing support so your team confidently adopts new systems." },
  ];

  const renderGrid = (items: typeof documentMgmt) => (
    <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 rounded-xl overflow-hidden border border-border">
      {items.map((f) => (
        <div key={f.title} className="bg-card p-7 hover:bg-muted/40 transition-colors">
          <f.icon className="h-5 w-5 text-accent" />
          <h3 className="mt-5 text-base font-semibold tracking-tight">{f.title}</h3>
          <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-36 pb-16 border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Services</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight text-balance">
            Solutions for every stage of your <span className="italic text-accent">digital journey.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70 leading-relaxed">
            From your first scan to a fully automated workflow — complete information management services tailored for SMEs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">01 — Document Management</p>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl tracking-tight">Get your records in order.</h2>
            </div>
          </div>
          {renderGrid(documentMgmt)}
        </div>
      </section>

      <section className="py-20 bg-muted/30 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">02 — Information Management</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl tracking-tight">Make your information work for you.</h2>
          </div>
          {renderGrid(infoMgmt)}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">Not sure where to start?</h2>
          <p className="mt-4 text-foreground/70">Book a complimentary 30-minute consultation. We'll listen, ask the right questions, and recommend the best fit for your business.</p>
          <Link to="/pricing" className="mt-8 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
            See packages & rates
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
