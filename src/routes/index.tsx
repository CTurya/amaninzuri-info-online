import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Cloud, Sparkles, FileSearch, ShieldCheck, FolderHeart, Database, GraduationCap, Workflow } from "lucide-react";
import heroImage from "@/assets/logo.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amani Nzuri Information Management Consulting — Digitising Records. Simplifying Business." },
      { name: "description", content: "Amani Nzuri helps South African SMEs digitise records, set up secure cloud storage, automate workflows, and stay POPIA compliant." },
      { property: "og:title", content: "Amani Nzuri Information Management Consulting" },
      { property: "og:description", content: "Digitising records. Simplifying business. Trusted information management for SMEs in South Africa." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <LogoStrip />
      <ServicesGrid />
      <ProcessSection />
      <WhyUs />
      <CTASection />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-warm/70">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid gap-16 lg:grid-cols-[1.15fr,1fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-warm bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Information management consultancy
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.04] tracking-tight text-balance">
              Modern records, organised for the way you work.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
              Amani Nzuri helps South African organisations move from paper-based systems to secure, structured digital workflows — designed around your business, not the other way round.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background hover:bg-foreground/85 transition-all hover:gap-3"
              >
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center justify-center rounded-md border border-warm bg-card px-5 py-3 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
              >
                Explore services
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              POPIA compliant · 100% BEE compliant · Established 2024
            </p>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-card ring-1 ring-warm shadow-card flex items-center justify-center p-12">
              <img
                src={heroImage}
                alt="Amani Nzuri Information Management Consulting"
                className="w-full h-full object-contain"
              />
            </div>
            <FloatingCard />
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingCard() {
  return (
    <div className="absolute -bottom-6 -left-4 sm:-left-10 max-w-xs rounded-xl bg-card p-4 shadow-card ring-1 ring-warm">
      <div className="flex items-center gap-3">
        <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary">
          <ShieldCheck className="h-4 w-4 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">POPIA compliant by design</p>
          <p className="text-xs text-muted-foreground">Secure, confidential records</p>
        </div>
      </div>
    </div>
  );
}

function LogoStrip() {
  const items = ["Healthcare", "Legal", "Property", "Finance", "Non-profit", "Education"];
  return (
    <section className="border-b border-warm/70 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
        <span className="text-foreground/80">Trusted across sectors —</span>
        {items.map((i) => (
          <span key={i}>{i}</span>
        ))}
      </div>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    { icon: FileSearch, title: "Document digitisation", desc: "Turn boxes of paper into searchable, secure digital files." },
    { icon: FolderHeart, title: "Records management", desc: "Frameworks and systems that keep your records organised and compliant." },
    { icon: Cloud, title: "Cloud storage & migration", desc: "Move safely to the cloud with a structure built for your business." },
    { icon: Database, title: "Custom databases & dashboards", desc: "See your data clearly with bespoke reporting tools." },
    { icon: Workflow, title: "Workflow automation", desc: "Automate the repetitive admin so your team can focus on what matters." },
    { icon: GraduationCap, title: "Staff training & support", desc: "We train your team and stay close so adoption sticks." },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-4xl">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Services</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
              Information management, end to end.
            </h2>
          </div>
          <p className="md:max-w-sm text-base text-muted-foreground">
            From the first scan to a fully automated workflow — we cover every step of your digital transformation.
          </p>
        </div>
        <div className="mt-14 grid gap-px bg-border rounded-2xl overflow-hidden ring-1 ring-warm md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group bg-card p-8 hover:bg-secondary/40 transition-colors">
              <div className="grid h-10 w-10 place-items-center rounded-md bg-secondary text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { n: "01", title: "Consultation", desc: "We start with a free 30-minute session to understand your business needs." },
    { n: "02", title: "Assessment", desc: "We evaluate your existing systems and map a clear path forward." },
    { n: "03", title: "Digitisation", desc: "Records are converted into clean, searchable digital formats." },
    { n: "04", title: "Implementation", desc: "We deploy secure, scalable digital solutions tailored to your team." },
    { n: "05", title: "Training & support", desc: "Ongoing support and training so adoption is seamless." },
  ];
  return (
    <section className="py-24 bg-secondary/40 border-y border-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Our process</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            A clear path, every time.
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {steps.map((s) => (
            <div key={s.n} className="border-t border-foreground/15 pt-5">
              <div className="font-mono text-xs text-accent">{s.n}</div>
              <h3 className="mt-3 font-display text-lg font-medium tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const reasons = [
    "Professional and reliable services",
    "Tailored solutions for SMEs",
    "Secure and confidential data handling",
    "Compliance with industry standards",
    "Affordable, scalable packages",
    "Dedicated client support · 100% BEE compliant",
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 grid gap-14 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent">Why Amani Nzuri</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-[1.05] tracking-tight text-balance">
            Trusted partners in digital transformation.
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Our mission is to empower businesses through efficient, secure, and accessible information systems. Our vision: to become a trusted leader in digital transformation across Africa.
          </p>
        </div>
        <ul className="grid gap-0 divide-y divide-border rounded-xl ring-1 ring-warm bg-card overflow-hidden">
          {reasons.map((r) => (
            <li key={r} className="flex items-start gap-3 px-5 py-4">
              <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-secondary text-accent">
                <Sparkles className="h-2.5 w-2.5" />
              </span>
              <span className="text-sm text-foreground/85">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="pb-24 lg:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="rounded-2xl bg-foreground text-background px-8 py-16 sm:px-14 sm:py-20 text-center shadow-warm">
          <h2 className="font-display text-4xl sm:text-5xl font-medium text-balance leading-[1.05] tracking-tight">
            Ready to digitise your business?
          </h2>
          <p className="mt-5 text-base text-background/70 max-w-xl mx-auto">
            Book a free 30-minute consultation. We'll learn what you need and recommend a clear next step — no pressure.
          </p>
          <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:amaninzuripty@gmail.com"
              className="inline-flex items-center gap-2 rounded-md bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-background/90 transition-colors"
            >
              Email us <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="tel:+27712419994"
              className="inline-flex items-center justify-center rounded-md border border-background/20 px-6 py-3 text-sm font-medium text-background hover:bg-background/10 transition-colors"
            >
              Call 071 241 9994
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
