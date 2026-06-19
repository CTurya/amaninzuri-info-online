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

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Our services</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            Solutions for every stage of your <span className="italic">digital journey.</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70 max-w-2xl mx-auto">
            From your first scan to a fully automated workflow — we provide complete information management services tailored for SMEs.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Document Management</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Get your records in order.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {documentMgmt.map((f) => (
              <div key={f.title} className="rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-cream/60 border-y border-warm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10">
            <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Information Management</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Make your information work for you.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {infoMgmt.map((f) => (
              <div key={f.title} className="rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl sm:text-4xl">Not sure where to start?</h2>
          <p className="mt-4 text-foreground/70">Book a complimentary 30-minute consultation. We'll listen, ask the right questions, and recommend the best fit for your business.</p>
          <div className="mt-8">
            <Link to="/book" className="inline-flex rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors">
              Book a consultation
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
