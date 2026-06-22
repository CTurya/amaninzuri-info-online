import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Sparkles, ShieldCheck, FolderSearch, Scale, Laptop, FileSearch, FolderHeart, FileText, GraduationCap, Cloud, CircleCheck as CheckCircle2, BadgeCheck } from "lucide-react";
import heroImage from "@/assets/hero-desk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amani Nzuri — Information & records management that holds up under scrutiny" },
      {
        name: "description",
        content:
          "Amani Nzuri helps South African organisations move beyond 'we think we're compliant' to 'here's the evidence.' Audit-ready records, POPIA compliance, and safe digital transitions.",
      },
      { property: "og:title", content: "Amani Nzuri — Information & Records Management" },
      {
        property: "og:description",
        content:
          "From 'we think we're compliant' to 'here's the evidence.' Records, POPIA and digital transition support built to hold up when an auditor asks.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <WhyClients />
      <ServicesGrid />
      <Credibility />
      <Stats />
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
              <Sparkles className="h-3 w-3 text-rose-deep" /> Information & records management · Estd 2024
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.05] text-balance">
              Your records are organised.{" "}
              <span className="italic text-rose-deep">But can you prove it?</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70 leading-relaxed">
              Amani Nzuri helps organisations move beyond "we think we're compliant" to "here's the evidence."
              Information and records management that holds up when an auditor, regulator, or funder asks the hard questions.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-warm hover:bg-foreground/85 transition-all hover:gap-3"
              >
                Book a Free Records Health Check <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-full border border-warm bg-card/60 px-6 py-3.5 text-sm font-medium text-foreground hover:bg-card transition-colors backdrop-blur"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              Tailored for SMEs & NGOs · POPIA compliant · 100% BEE compliant
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-rose opacity-20 blur-2xl rounded-[2rem]" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-warm ring-1 ring-warm">
              <img
                src={heroImage}
                alt="A warm, natural desk with documents and a notebook representing organised business records"
                width={1536}
                height={1280}
                className="w-full h-auto object-cover"
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
          <p className="text-sm font-medium truncate">Evidence, not assumptions</p>
          <p className="text-xs text-muted-foreground">Built to withstand audits & POPIA scrutiny</p>
        </div>
      </div>
    </div>
  );
}

function WhyClients() {
  const cards = [
    {
      icon: FolderSearch,
      title: "An auditor asked for 5 years of records — and we couldn't find them",
      text:
        "Missing or disorganised records turn routine audits into crises. We help you build systems where the right document is always one search away.",
      cta: "Get an audit-ready assessment",
    },
    {
      icon: Scale,
      title: "A funder or client is asking for our POPIA compliance proof",
      text:
        "More funders, donors, and corporate clients now require proof of data protection compliance before they'll work with you. We help you build — and document — that proof.",
      cta: "Start a POPIA readiness check",
    },
    {
      icon: Laptop,
      title: "We're moving from paper to digital and we're terrified of losing everything",
      text:
        "Digital transitions go wrong when they're rushed. We make sure nothing falls through the cracks — every file accounted for, every step documented.",
      cta: "Plan your digital transition",
    },
  ];
  return (
    <section className="py-24 lg:py-28 bg-cream/60 border-y border-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">What brings clients to us</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            The three conversations <span className="italic">we hear most.</span>
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group flex flex-col rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blush text-rose-deep group-hover:bg-gradient-rose group-hover:text-primary-foreground transition-all">
                <c.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl font-medium leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm text-foreground/70 leading-relaxed flex-1">{c.text}</p>
              <Link
                to="/book"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-rose-deep hover:gap-2.5 transition-all"
              >
                {c.cta} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesGrid() {
  const services = [
    {
      icon: FileSearch,
      tag: "MOST POPULAR",
      title: "Information & Records Audit",
      desc: "A full snapshot of where your records live, what's missing, and what's at risk — with a clear, prioritised remediation plan.",
    },
    {
      icon: ShieldCheck,
      tag: "REGULATORY",
      title: "POPIA Compliance",
      desc: "Assess your organisation's compliance posture and build the policies, processes, and training needed to protect personal information — backed by guidance from our Information Officer partner.",
    },
    {
      icon: FolderHeart,
      tag: "CORE SERVICE",
      title: "Records Management Systems",
      desc: "Frameworks, classification, retention and disposal that keep your records organised, findable and defensible.",
    },
    {
      icon: FileText,
      tag: "GOVERNANCE",
      title: "Information Policy Development",
      desc: "Practical, plain-language policies aligned to your structure — not boilerplate documents that sit in a drawer.",
    },
    {
      icon: GraduationCap,
      tag: "TRAINING",
      title: "Staff Training & Capacity Building",
      desc: "We upskill your team so good practice becomes habit — and so adoption survives long after we're gone.",
    },
    {
      icon: Cloud,
      tag: "DIGITAL",
      title: "Digital Transition Support",
      desc: "Move from paper to digital safely — every file accounted for, every step documented.",
    },
  ];
  return (
    <section id="services" className="py-24 lg:py-32 scroll-mt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">What we do</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            Information management,<br /><span className="italic">end to end.</span>
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Six services that work on their own — or together — to give you records that hold up under scrutiny.
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep group-hover:bg-gradient-rose group-hover:text-primary-foreground transition-all">
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-semibold tracking-[0.14em] text-rose-deep/80 bg-blush/60 rounded-full px-2.5 py-1">
                  {s.tag}
                </span>
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

function Credibility() {
  const points = [
    "Information Officer–reviewed compliance guidance",
    "Practical systems, not just policy documents",
    "Built for real teams — including NGOs and small organisations with limited capacity",
  ];
  return (
    <section className="py-24 bg-cream/60 border-y border-warm">
      <div className="mx-auto max-w-6xl px-6 lg:px-10 grid gap-12 lg:grid-cols-[1fr,1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-card border border-warm px-3 py-1 text-xs font-medium text-rose-deep">
            <BadgeCheck className="h-3.5 w-3.5" /> Credibility
          </span>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            Backed by <span className="italic">qualified expertise.</span>
          </h2>
          <p className="mt-5 text-lg text-foreground/70 leading-relaxed">
            Our POPIA and information governance guidance is supported by a registered Information Officer partner —
            so recommendations aren't just best practice, they're built to hold up under regulatory scrutiny.
          </p>
        </div>
        <ul className="grid gap-3">
          {points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-2xl bg-card ring-1 ring-warm shadow-soft px-5 py-4"
            >
              <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-blush text-rose-deep">
                <CheckCircle2 className="h-4 w-4" />
              </span>
              <span className="text-sm text-foreground/80 leading-relaxed">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: "R46 million", label: "Average cost of a data breach to a South African organisation" },
    { value: "R5 million", label: "Largest POPIA fine issued to date" },
    { value: "72 hours", label: "Time allowed to notify the Information Regulator after a breach" },
  ];
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">The stakes</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            What's actually <span className="italic">on the line.</span>
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.value}
              className="rounded-3xl bg-gradient-soft ring-1 ring-warm shadow-soft p-8 text-center"
            >
              <div className="font-display text-5xl sm:text-6xl font-medium text-rose-deep leading-none">
                {s.value}
              </div>
              <p className="mt-4 text-sm text-foreground/70 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h2 className="font-display text-4xl sm:text-5xl font-medium text-balance leading-tight">
          Ready to know <span className="italic text-rose-deep">exactly where you stand?</span>
        </h2>
        <p className="mt-5 text-lg text-foreground/70 max-w-xl mx-auto">
          Book a free 20-minute consultation and we'll walk you through your biggest risks — no obligation.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-7 py-4 text-sm font-medium text-primary-foreground shadow-warm hover:opacity-90 transition-opacity"
          >
            Book your free consultation <ArrowRight className="h-4 w-4" />
          </Link>
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
