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
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-soft">
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blush blur-3xl opacity-60" aria-hidden />
      <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-accent/40 blur-3xl opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[1.1fr,1fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-warm bg-card/60 px-3 py-1 text-xs font-medium text-foreground/70 backdrop-blur">
              <Sparkles className="h-3 w-3 text-rose-deep" /> Information management consultancy · Estd 2024
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] text-balance">
              Digitising records.<br />
              <span className="italic text-rose-deep">Simplifying business.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70 leading-relaxed">
              Amani Nzuri helps South African organisations move from paper-based systems to efficient, secure, and scalable digital solutions — so your records work as hard as you do.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-warm hover:bg-foreground/85 transition-all hover:gap-3"
              >
                Book a free consultation <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center justify-center rounded-full border border-warm bg-card/60 px-6 py-3.5 text-sm font-medium text-foreground hover:bg-card transition-colors backdrop-blur"
              >
                See our services
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Tailored for SMEs · POPIA compliant · 100% BEE compliant
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-rose opacity-20 blur-2xl rounded-[2rem]" aria-hidden />
            <div className="relative aspect-square overflow-hidden rounded-[1.75rem] bg-cream shadow-warm ring-1 ring-warm flex items-center justify-center p-10">
              <img
                src={heroImage}
                alt="Amani Nzuri Information Management Consulting — established 2024"
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
    <div className="absolute -bottom-8 -left-4 sm:-left-12 max-w-xs rounded-2xl bg-card p-4 shadow-card ring-1 ring-warm">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-blush">
          <ShieldCheck className="h-5 w-5 text-rose-deep" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">POPIA compliant by design</p>
          <p className="text-xs text-muted-foreground">Secure & confidential records handling</p>
        </div>
      </div>
    </div>
  );
}

function ServicesGrid() {
  const services = [
    { icon: FileSearch, title: "Document Digitisation & Scanning", desc: "Turn boxes of paper into searchable, secure digital files." },
    { icon: FolderHeart, title: "Records Management Solutions", desc: "Frameworks and systems that keep your records organised and compliant." },
    { icon: Cloud, title: "Cloud Storage Setup & Migration", desc: "Move safely to the cloud with a structure built for your business." },
    { icon: Database, title: "Custom Databases & Dashboards", desc: "See your data clearly with bespoke dashboards and reporting tools." },
    { icon: Workflow, title: "Workflow Automation", desc: "Automate the repetitive admin so your team can focus on what matters." },
    { icon: GraduationCap, title: "Staff Training & Support", desc: "We train your team and stay close so adoption sticks." },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">What we do</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            Information management,<br /><span className="italic">end to end.</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            From the first scan to a fully automated workflow — we cover every step of your digital transformation.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep group-hover:bg-gradient-rose group-hover:text-primary-foreground transition-all">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
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
    { n: "05", title: "Training & Support", desc: "Ongoing support and training so adoption is seamless." },
  ];
  return (
    <section className="py-24 bg-cream/60 border-y border-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Our process</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            A clear path, <span className="italic">every time.</span>
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="font-display text-5xl text-rose-deep/30">{s.n}</div>
              <h3 className="mt-3 font-display text-xl font-medium">{s.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
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
      <div className="mx-auto max-w-6xl px-6 lg:px-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Why Amani Nzuri</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            Trusted partners in<br /><span className="italic">digital transformation.</span>
          </h2>
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
            Our mission is to empower businesses through efficient, secure, and accessible information systems. Our vision: to become a trusted leader in digital transformation across Africa.
          </p>
        </div>
        <ul className="grid gap-3">
          {reasons.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-2xl bg-card ring-1 ring-warm shadow-soft px-5 py-4">
              <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-blush text-rose-deep">
                <Sparkles className="h-3 w-3" />
              </span>
              <span className="text-sm text-foreground/80">{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-medium text-balance leading-tight">
          Ready to digitise your business?
        </h2>
        <p className="mt-5 text-lg text-foreground/70 max-w-xl mx-auto">
          Book a free 30-minute consultation. We'll learn what you need and recommend a clear next step — no pressure.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:amaninzuripty@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-7 py-4 text-sm font-medium text-primary-foreground shadow-warm hover:opacity-90 transition-opacity"
          >
            Email us <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+27712419994"
            className="inline-flex items-center justify-center rounded-full border border-warm bg-card px-7 py-4 text-sm font-medium text-foreground hover:bg-cream transition-colors"
          >
            Call 071 241 9994
          </a>
        </div>
      </div>
    </section>
  );
}
