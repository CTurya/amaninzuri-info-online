import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Packages & Rates — Amani Nzuri Information Management Consulting" },
      { name: "description", content: "Affordable, scalable digitisation packages and consulting rates in ZAR. Starter from R10 500, Growth from R18 500, Premium from R35 000." },
      { property: "og:title", content: "Packages & Rates — Amani Nzuri" },
      { property: "og:description", content: "Affordable, scalable digitisation packages for South African SMEs." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const tiers = [
    {
      name: "Starter",
      tagline: "Digital Foundation",
      price: "From R10 500",
      blurb: "Ideal for businesses beginning their digital transformation.",
      features: ["Document digitisation (basic volume)", "Cloud storage setup", "Simple records structure", "Onboarding & handover"],
      highlight: false,
    },
    {
      name: "Growth",
      tagline: "Business Efficiency Suite",
      price: "From R18 500",
      blurb: "Designed to streamline operations and enhance productivity.",
      features: ["Everything in Starter", "Advanced records management system", "Custom templates & taxonomies", "Workflow improvements", "Staff training session"],
      highlight: true,
    },
    {
      name: "Premium",
      tagline: "Full Digital Transformation",
      price: "From R35 000",
      blurb: "Comprehensive solutions for scalable and automated systems.",
      features: ["Everything in Growth", "Custom databases & dashboards", "Workflow automation", "POPIA compliance support", "Ongoing training & support"],
      highlight: false,
    },
  ];

  const consulting = [
    { name: "Initial Consultation", length: "30 minutes", desc: "A complimentary session to understand your business needs.", fee: "Free" },
    { name: "Standard Consulting", length: "Per hour", desc: "Expert guidance on document digitisation, cloud storage and records organisation.", fee: "R1 500" },
    { name: "Specialised Information Management", length: "Per hour", desc: "Records management frameworks, compliance, governance and strategic digital transformation.", fee: "R2 500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <section className="pt-36 pb-16 border-b border-border/60">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Packages & rates</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-[1.05] tracking-tight text-balance">
            Transparent pricing for <span className="italic text-accent">every stage.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-foreground/70">All prices in ZAR. Custom scopes available on request.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-xl p-8 border transition-all ${
                t.highlight
                  ? "bg-primary text-primary-foreground border-primary shadow-card"
                  : "bg-card border-border"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                  Most popular
                </span>
              )}
              <p className={`text-xs uppercase tracking-[0.18em] ${t.highlight ? "text-primary-foreground/70" : "text-accent"}`}>{t.tagline}</p>
              <h3 className="mt-2 font-display text-2xl tracking-tight">{t.name}</h3>
              <div className="mt-6 pb-6 border-b border-current/15">
                <span className="font-display text-4xl font-medium">{t.price}</span>
              </div>
              <p className={`mt-5 text-sm ${t.highlight ? "text-primary-foreground/80" : "text-foreground/70"}`}>{t.blurb}</p>
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${t.highlight ? "text-primary-foreground" : "text-accent"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:amaninzuripty@gmail.com?subject=Enquiry about the ${t.name} package`}
                className={`mt-8 inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-sm font-medium transition-colors ${
                  t.highlight
                    ? "bg-background text-foreground hover:bg-background/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Enquire about {t.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-muted/30 border-y border-border/60">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Consulting fees</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl tracking-tight">Hourly expertise, when you need it.</h2>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold hidden md:table-cell">Description</th>
                  <th className="px-6 py-4 font-semibold text-right">Fee</th>
                </tr>
              </thead>
              <tbody>
                {consulting.map((c, i) => (
                  <tr key={c.name} className={i > 0 ? "border-t border-border" : ""}>
                    <td className="px-6 py-5 align-top">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.length}</p>
                      <p className="mt-2 text-xs text-foreground/70 md:hidden">{c.desc}</p>
                    </td>
                    <td className="px-6 py-5 align-top text-foreground/70 hidden md:table-cell">{c.desc}</td>
                    <td className="px-6 py-5 align-top text-right font-display text-lg whitespace-nowrap">{c.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">All consulting fees in South African Rand (ZAR), excluding VAT where applicable.</p>
        </div>
      </section>

      <section className="py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight">Need a custom quote?</h2>
          <p className="mt-3 text-foreground/70">Every business is different. Tell us about your records and we'll put together a tailored proposal.</p>
          <a
            href="mailto:amaninzuripty@gmail.com"
            className="mt-7 inline-flex rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Email amaninzuripty@gmail.com
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
