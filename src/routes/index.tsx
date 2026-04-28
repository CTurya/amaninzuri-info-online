import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, Cloud, Sparkles, Users, FileSearch, ShieldCheck, FolderHeart } from "lucide-react";
import heroImage from "@/assets/hero-desk.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Petal — Digitise client records for small business" },
      { name: "description", content: "A calm, beautiful way to digitise client records, store documents in the cloud, and let AI extract the details for you." },
      { property: "og:title", content: "Petal — Digitise client records for small business" },
      { property: "og:description", content: "A calm, beautiful way to digitise client records, store documents in the cloud, and let AI extract the details for you." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <FeaturesGrid />
      <HowItWorks />
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
              <Sparkles className="h-3 w-3 text-rose-deep" /> AI-powered record keeping
            </span>
            <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.02] text-balance">
              Your client records,<br />
              <span className="italic text-rose-deep">finally in bloom.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-foreground/70 leading-relaxed">
              Amani Nzuri is the calm, paper-soft way to digitise client information and documents.
              Upload, organise, and let AI pull the details out — so you can spend less time filing and more time doing.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/auth"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-warm hover:bg-foreground/85 transition-all hover:gap-3"
              >
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/features"
                className="inline-flex items-center justify-center rounded-full border border-warm bg-card/60 px-6 py-3.5 text-sm font-medium text-foreground hover:bg-card transition-colors backdrop-blur"
              >
                See how it works
              </Link>
            </div>
            <p className="mt-5 text-xs text-muted-foreground">
              No credit card needed · Free for up to 25 clients
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-rose opacity-20 blur-2xl rounded-[2rem]" aria-hidden />
            <div className="relative overflow-hidden rounded-[1.75rem] shadow-warm ring-1 ring-warm">
              <img
                src={heroImage}
                alt="A pastel pink notebook on a warm desk with pampas grass, a small succulent and cream paper folders"
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
          <FileSearch className="h-5 w-5 text-rose-deep" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">Invoice_2026_Q1.pdf</p>
          <p className="text-xs text-muted-foreground">Extracted: $2,340 · Due Apr 30</p>
        </div>
      </div>
    </div>
  );
}

function FeaturesGrid() {
  const features = [
    { icon: Users, title: "Client records, organised", desc: "Keep contacts, notes, tags, and history in one calm place. Find anyone in seconds." },
    { icon: Cloud, title: "Documents in the cloud", desc: "Drag, drop, done. Every file is encrypted, backed up, and tied to the right client." },
    { icon: Sparkles, title: "AI reads the paper for you", desc: "Receipts, invoices, contracts — Our AI extracts the key details so you don't retype." },
    { icon: FolderHeart, title: "Tags & smart folders", desc: "Group by project, status, or anything you like. Custom tags for the way you work." },
    { icon: ShieldCheck, title: "Private by default", desc: "Row-level security means only you and your team see your records. Always." },
    { icon: FileSearch, title: "Full-text search", desc: "Search inside documents, not just file names. Even handwritten scans, soon." },
  ];
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Everything you need</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight text-balance">
            A studio for your paperwork.
          </h2>
          <p className="mt-4 text-lg text-foreground/70">
            Built for solo founders, small studios, and anyone tired of folders called "stuff".
          </p>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="group rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft hover:shadow-card transition-all hover:-translate-y-0.5">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep group-hover:bg-gradient-rose group-hover:text-primary-foreground transition-all">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", title: "Add your clients", desc: "Manually or import a CSV. Organise with tags and notes the way you actually think." },
    { n: "02", title: "Upload anything", desc: "PDFs, photos, scans, contracts. We store them safely and ties each file to a client." },
    { n: "03", title: "Let AI do the typing", desc: "We extract names, dates, amounts and key terms automatically. You just review and save." },
  ];
  return (
    <section className="py-24 bg-cream/60 border-y border-warm">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
          {steps.map((s) => (
            <div key={s.n}>
              <div className="font-display text-6xl text-rose-deep/30">{s.n}</div>
              <h3 className="mt-3 font-display text-2xl font-medium">{s.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{s.desc}</p>
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
          Less filing. More flowering.
        </h2>
        <p className="mt-5 text-lg text-foreground/70 max-w-xl mx-auto">
          Get started free. Set up your first 25 client records in under five minutes.
        </p>
        <div className="mt-9">
          <Link
            to="/auth"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-rose px-7 py-4 text-sm font-medium text-primary-foreground shadow-warm hover:opacity-90 transition-opacity"
          >
            Create your free account <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
