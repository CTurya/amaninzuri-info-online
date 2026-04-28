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
      features: [
        "Document digitisation (basic volume)",
        "Cloud storage setup",
        "Simple records structure",
        "Onboarding & handover",
      ],
      highlight: false,
    },
    {
      name: "Growth",
      tagline: "Business Efficiency Suite",
      price: "From R18 500",
      blurb: "Designed to streamline operations and enhance productivity.",
      features: [
        "Everything in Starter",
        "Advanced records management system",
        "Custom templates & taxonomies",
        "Workflow improvements",
        "Staff training session",
      ],
      highlight: true,
    },
    {
      name: "Premium",
      tagline: "Full Digital Transformation",
      price: "From R35 000",
      blurb: "Comprehensive solutions for scalable and automated systems.",
      features: [
        "Everything in Growth",
        "Custom databases & dashboards",
        "Workflow automation",
        "POPIA compliance support",
        "Ongoing training & support",
      ],
      highlight: false,
    },
  ];

  const consulting = [
    {
      name: "Initial Consultation",
      length: "30 minutes",
      desc: "A complimentary session to understand your business needs.",
      fee: "Free",
    },
    {
      name: "Standard Consulting",
      length: "Per hour",
      desc: "Expert guidance on document digitisation, cloud storage and records organisation to improve operational efficiency and accessibility.",
      fee: "R1 500",
    },
    {
      name: "Specialised Information Management",
      length: "Per hour",
      desc: "Professional expertise in records management frameworks, compliance, governance and strategic digital transformation initiatives.",
      fee: "R2 500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Packages & rates</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            Affordable, <span className="italic">scalable packages.</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70">All prices in ZAR. Custom scopes available on request.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 grid gap-6 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 ring-1 transition-all ${
                t.highlight
                  ? "bg-gradient-rose text-primary-foreground ring-rose-deep/30 shadow-warm scale-[1.02]"
                  : "bg-card ring-warm shadow-soft"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-xs font-medium text-background">
                  Most popular
                </span>
              )}
              <h3 className="font-display text-2xl">{t.name}</h3>
              <p className={`mt-1 text-sm ${t.highlight ? "text-primary-foreground/80" : "text-foreground/60"}`}>{t.tagline}</p>
              <div className="mt-6">
                <span className="font-display text-4xl font-medium">{t.price}</span>
              </div>
              <p className={`mt-3 text-sm ${t.highlight ? "text-primary-foreground/85" : "text-foreground/70"}`}>{t.blurb}</p>
              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${t.highlight ? "text-primary-foreground" : "text-rose-deep"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="mailto:amaninzuripty@gmail.com?subject=Enquiry%20about%20the%20{t.name}%20package"
                className="mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium bg-foreground text-background hover:bg-foreground/85 transition-colors"
              >
                Enquire about {t.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-cream/60 border-y border-warm">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Consulting fees</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Hourly expertise, when you need it.</h2>
          </div>
          <div className="overflow-hidden rounded-3xl ring-1 ring-warm bg-card shadow-soft">
            <table className="w-full text-sm">
              <thead className="bg-cream/60">
                <tr className="text-left">
                  <th className="px-6 py-4 font-semibold">Service</th>
                  <th className="px-6 py-4 font-semibold hidden md:table-cell">Description</th>
                  <th className="px-6 py-4 font-semibold text-right">Fee</th>
                </tr>
              </thead>
              <tbody>
                {consulting.map((c, i) => (
                  <tr key={c.name} className={i > 0 ? "border-t border-warm/60" : ""}>
                    <td className="px-6 py-5 align-top">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.length}</p>
                      <p className="mt-2 text-xs text-foreground/70 md:hidden">{c.desc}</p>
                    </td>
                    <td className="px-6 py-5 align-top text-foreground/70 hidden md:table-cell">{c.desc}</td>
                    <td className="px-6 py-5 align-top text-right font-display text-lg whitespace-nowrap">{c.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">All consulting fees in South African Rand (ZAR), excluding VAT where applicable.</p>
        </div>
      </section>

      <section className="py-20 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-display text-3xl sm:text-4xl">Need a custom quote?</h2>
          <p className="mt-3 text-foreground/70">Every business is different. Tell us about your records and we'll put together a tailored proposal.</p>
          <a
            href="mailto:amaninzuripty@gmail.com"
            className="mt-7 inline-flex rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors"
          >
            Email amaninzuripty@gmail.com
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
