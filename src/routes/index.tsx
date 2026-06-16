import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  ArrowRight,
  ArrowUpRight,
  Cloud,
  FileSearch,
  ShieldCheck,
  FolderHeart,
  Database,
  GraduationCap,
  Workflow,
  ScanLine,
  Building2,
  Scale,
  Stethoscope,
  Landmark,
  Sparkles,
  Lock,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amani Nzuri Information Management Consulting — Digitise. Organise. Simplify." },
      { name: "description", content: "Amani Nzuri helps South African SMEs digitise records, set up secure cloud storage, automate workflows, and stay POPIA compliant." },
      { property: "og:title", content: "Amani Nzuri Information Management Consulting" },
      { property: "og:description", content: "Digitising records. Simplifying business. Trusted information management for SMEs in South Africa." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <SiteHeader />
      <Hero />
      <StatsBar />
      <AboutBlock />
      <ServicesGrid />
      <ProcessSection />
      <WhyUs />
      <IndustriesStrip />
      <CTASection />
      <SiteFooter />
    </div>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  const tags = ["Document digitisation", "Records management", "Cloud storage", "Automation", "POPIA compliance"];
  return (
    <section className="relative overflow-hidden">
      {/* faint grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]"
      />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/85">
          <Sparkles className="h-3 w-3 text-accent" /> Digitise · Organise · Simplify
        </span>

        <h1 className="mt-8 font-display text-[2.75rem] sm:text-6xl lg:text-[5.5rem] font-extrabold leading-[0.98] tracking-[-0.04em] text-balance max-w-5xl">
          Move Your Business Into the <span className="text-accent">Digital Era</span> of Records and Information.
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Amani Nzuri helps South African organisations replace paper files with secure, structured digital workflows — and we stay with you long enough to make sure your team actually uses them.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <Link
            to="/auth"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-rose px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-warm hover:gap-3 transition-all"
          >
            Book a Consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/features"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-card/40 backdrop-blur px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-card transition-colors"
          >
            Explore Our Services
          </Link>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_var(--accent)]" />
          {tags.map((t, i) => (
            <span key={t} className="text-sm text-foreground/80 flex items-center gap-6">
              {t}
              {i < tags.length - 1 && <span className="text-muted-foreground/40">·</span>}
            </span>
          ))}
        </div>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-card/60 px-4 py-2 text-xs text-muted-foreground">
          <Lock className="h-3.5 w-3.5 text-accent" /> POPIA compliant · 100% BEE compliant · Established 2024
        </div>
      </div>
    </section>
  );
}

/* ---------- STATS ---------- */
function StatsBar() {
  const stats = [
    { n: "6+", l: "Core service lines" },
    { n: "3", l: "Delivery models: Digitise · Manage · Train" },
    { n: "10+", l: "Industries served" },
    { n: "100%", l: "BEE & POPIA compliant" },
  ];
  return (
    <section className="border-y border-white/10 bg-black/20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s) => (
          <div key={s.l} className="text-center md:text-left">
            <div className="font-display text-5xl md:text-6xl font-extrabold tracking-tight text-accent leading-none">
              {s.n}
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- ABOUT ---------- */
function AboutBlock() {
  const bullets = [
    "Consultation, delivery and training under one roof",
    "Practical, real-world implementation — not slideware",
    "Secure cloud storage on platforms your team already trusts",
    "Hands-on training so your team owns the system",
    "We build self-sufficiency, never dependency",
  ];
  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid gap-14 lg:grid-cols-[1fr,1.1fr] lg:items-center">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">About Us</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02] text-balance">
            We Don't Just Digitise — We <span className="text-accent">Empower</span>.
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground leading-relaxed">
            Amani Nzuri is an information management consultancy. We help SMEs replace paper-based admin with structured digital records, secure cloud storage and automated workflows.
          </p>
          <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
            What makes us different: we teach your team how to run it themselves. Real knowledge transfer, no vendor lock-in.
          </p>
        </div>
        <ul className="grid gap-3">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-4 rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-5 hover:border-accent/40 transition-colors"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-rose text-primary-foreground">
                <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="text-[15px] text-foreground/90">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- SERVICES ---------- */
function ServicesGrid() {
  const services = [
    { icon: ScanLine, title: "Document Digitisation", desc: "Convert paper records into clean, searchable PDFs and OCR-indexed files." },
    { icon: FolderHeart, title: "Records Management", desc: "Frameworks that keep records organised, retention-aware and audit-ready." },
    { icon: Cloud, title: "Cloud Storage & Migration", desc: "Migrate safely to Google Drive, OneDrive or SharePoint with a clear structure." },
    { icon: Database, title: "Databases & Dashboards", desc: "Custom databases and reporting so you can actually find and use your data." },
    { icon: Workflow, title: "Workflow Automation", desc: "Automate repetitive admin — approvals, naming, filing, reminders." },
    { icon: GraduationCap, title: "Staff Training & Support", desc: "We train your team and stay close so adoption sticks long-term." },
  ];
  return (
    <section className="py-24 lg:py-32 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-5xl">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">What We Do</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02] text-balance">
              End-to-end information management for modern SMEs.
            </h2>
          </div>
          <p className="md:max-w-sm text-base text-muted-foreground">
            From the first scanned page to a fully automated workflow — we cover every step of your digital transformation.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-7 hover:border-accent/50 hover:bg-card transition-all"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-rose text-primary-foreground shadow-warm">
                <s.icon className="h-5 w-5" strokeWidth={2.2} />
              </div>
              <h3 className="mt-6 text-lg font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              <Link
                to="/features"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:gap-2 transition-all"
              >
                Learn more <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROCESS ---------- */
function ProcessSection() {
  const steps = [
    { n: "01", title: "Discover", desc: "A free 30-minute consultation to understand your business, records and pain points." },
    { n: "02", title: "Assess", desc: "We audit your existing files and systems and map a clear, prioritised path forward." },
    { n: "03", title: "Digitise", desc: "Records are scanned, indexed and converted into clean, searchable digital formats." },
    { n: "04", title: "Implement", desc: "We deploy secure cloud structure, workflows and automation tailored to your team." },
    { n: "05", title: "Train", desc: "Hands-on training so your team owns the new system from day one." },
    { n: "06", title: "Support", desc: "Ongoing support and tuning as your business grows. You're not left to figure it out alone." },
  ];
  return (
    <section className="py-24 lg:py-32 border-t border-white/10 bg-black/25">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl mb-16">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Our Process</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02] text-balance">
            A clear path from paper chaos to digital control.
          </h2>
          <p className="mt-6 text-base text-muted-foreground">
            Every engagement follows the same structured approach — from first conversation to long-term support.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-white/10 bg-card/60 backdrop-blur p-7 hover:border-accent/40 transition-colors">
              <div className="font-display text-4xl font-extrabold text-accent leading-none">{s.n}</div>
              <h3 className="mt-5 font-display text-xl font-bold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- WHY US ---------- */
function WhyUs() {
  const reasons = [
    { t: "Professional & Reliable", d: "Clear scopes, fixed timelines, dependable delivery." },
    { t: "Tailored for SMEs", d: "Right-sized solutions for South African small and medium businesses." },
    { t: "Secure & Confidential", d: "Data is handled with strict POPIA-aligned controls." },
    { t: "Affordable & Scalable", d: "Packages that grow with you — no enterprise bloat." },
    { t: "Real Implementation", d: "Working systems live in your environment, not slide decks." },
    { t: "Long-term Partner", d: "We stay with you after go-live to make sure adoption sticks." },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent">Why Choose Us</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.02] text-balance">
            A partner that delivers <span className="text-accent">and</span> empowers.
          </h2>
        </div>
        <div className="mt-14 grid gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.t} className="bg-background/80 p-8 hover:bg-card transition-colors">
              <h3 className="text-lg font-bold tracking-tight">{r.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- INDUSTRIES ---------- */
function IndustriesStrip() {
  const items = [
    { icon: Stethoscope, label: "Healthcare" },
    { icon: Scale, label: "Legal" },
    { icon: Building2, label: "Property" },
    { icon: Landmark, label: "Finance" },
    { icon: FileSearch, label: "Non-profit" },
    { icon: GraduationCap, label: "Education" },
  ];
  return (
    <section className="border-y border-white/10 bg-black/25">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-14">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-accent text-center">Industries We Serve</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {items.map((i) => (
            <div key={i.label} className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-card/40 backdrop-blur p-5 hover:border-accent/40 transition-colors">
              <i.icon className="h-5 w-5 text-accent" />
              <span className="text-sm text-foreground/85">{i.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-rose p-10 sm:p-16 text-center shadow-warm">
          <div aria-hidden className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground/80">Free Discovery Call</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary-foreground tracking-[-0.035em] leading-[1.02] text-balance">
              Ready to digitise your business?
            </h2>
            <p className="mt-5 text-base text-primary-foreground/85 max-w-xl mx-auto">
              Tell us about your goals — we'll come back with a clear next step, usually within one business day.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:amaninzuripty@gmail.com"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 text-sm font-semibold text-foreground hover:bg-background/90 transition-colors"
              >
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="tel:+27712419994"
                className="inline-flex items-center justify-center rounded-full border border-primary-foreground/30 px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                Call 071 241 9994
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
