import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Amani Nzuri" },
      { name: "description", content: "Simple, fair pricing for small businesses. Start free, upgrade when you grow." },
      { property: "og:title", content: "Pricing — Amani Nzuri" },
      { property: "og:description", content: "Simple, fair pricing for small businesses." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const tiers = [
    {
      name: "Seedling",
      price: "Free",
      blurb: "Perfect for getting started.",
      features: ["Up to 25 clients", "1 GB document storage", "AI extraction (50/mo)", "Single user"],
      cta: "Start free",
      highlight: false,
    },
    {
      name: "Bloom",
      price: "$18",
      suffix: "/mo",
      blurb: "For solo businesses & studios.",
      features: ["Unlimited clients", "50 GB storage", "Unlimited AI extraction", "Up to 3 team members", "Priority support"],
      cta: "Start 14-day trial",
      highlight: true,
    },
    {
      name: "Garden",
      price: "$48",
      suffix: "/mo",
      blurb: "Growing teams & agencies.",
      features: ["Everything in Bloom", "500 GB storage", "Unlimited team members", "Client sharing portal", "Custom tags & branding"],
      cta: "Start 14-day trial",
      highlight: false,
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-12 bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Pricing</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            Honest pricing, <span className="italic">no surprises.</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70">Cancel anytime. No long contracts. No nonsense.</p>
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
              <p className={`mt-1 text-sm ${t.highlight ? "text-primary-foreground/80" : "text-foreground/60"}`}>{t.blurb}</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="font-display text-5xl font-medium">{t.price}</span>
                {t.suffix && <span className={t.highlight ? "text-primary-foreground/80" : "text-foreground/60"}>{t.suffix}</span>}
              </div>
              <ul className="mt-7 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`h-4 w-4 mt-0.5 shrink-0 ${t.highlight ? "text-primary-foreground" : "text-rose-deep"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-8 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                  t.highlight
                    ? "bg-foreground text-background hover:bg-foreground/85"
                    : "bg-foreground text-background hover:bg-foreground/85"
                }`}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
