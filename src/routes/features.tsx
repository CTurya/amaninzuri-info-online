import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Cloud, Sparkles, Users, FileSearch, ShieldCheck, FolderHeart, Tag, Share2 } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Amani Nzuri" },
      { name: "description", content: "Everything Amani Nzuri does to keep your client records and documents calm, searchable, and safe in the cloud." },
      { property: "og:title", content: "Features — Amani Nzuri" },
      { property: "og:description", content: "Cloud storage, AI document extraction, tags, sharing, and more." },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  const features = [
    { icon: Users, title: "Client records", desc: "Names, contacts, companies, custom notes — every detail in one tidy profile." },
    { icon: Cloud, title: "Cloud document vault", desc: "Encrypted, backed-up storage. Your files are safe even if your laptop isn't." },
    { icon: Sparkles, title: "AI data extraction", desc: "We read your invoices, receipts and contracts and pulls out the data automatically." },
    { icon: FileSearch, title: "Search everything", desc: "Find by name, tag, or what's actually written inside a document." },
    { icon: Tag, title: "Custom tags", desc: "Categorise the way your business works — by project, status, season, or vibe." },
    { icon: Share2, title: "Multi-user & sharing", desc: "Invite your team or share a single client folder with a collaborator." },
    { icon: ShieldCheck, title: "Privacy first", desc: "Row-level security means your records are visible only to you and people you invite." },
    { icon: FolderHeart, title: "Built to feel calm", desc: "Soft, paper-like design that doesn't shout at you. Work the way you'd like to." },
  ];
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">Features</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            Everything you need.<br />
            <span className="italic">Nothing you don't.</span>
          </h1>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="rounded-3xl bg-card p-7 ring-1 ring-warm shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blush text-rose-deep">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-foreground/70 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link to="/auth" className="inline-flex rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background hover:bg-foreground/85 transition-colors">
            Try it free
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
