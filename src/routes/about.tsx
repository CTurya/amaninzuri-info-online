import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Petal" },
      { name: "description", content: "Petal is built for the small businesses, studios and solo founders the big software forgot." },
      { property: "og:title", content: "About — Petal" },
      { property: "og:description", content: "A calm, beautiful tool for the businesses big software forgot." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-3xl px-6">
          <p className="text-sm font-medium uppercase tracking-wider text-rose-deep">About</p>
          <h1 className="mt-4 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            A calm tool, for the<br /><span className="italic">work you love.</span>
          </h1>
        </div>
      </section>
      <section className="py-20">
        <div className="mx-auto max-w-2xl px-6 prose-lg space-y-6 text-foreground/80 text-lg leading-relaxed">
          <p>
            Petal started with a simple frustration: most business software feels like it was built for skyscrapers, not studios. Endless menus. Sterile colours. Features no one asked for.
          </p>
          <p>
            We make tools for florists, photographers, therapists, bookkeepers, designers, makers — the small businesses that keep neighbourhoods alive. The kind of work where every client matters.
          </p>
          <p>
            That's why Petal looks the way it does: warm, paper-soft, quiet. And why it does just three things, well: hold your client records, store your documents safely, and let AI do the dull data entry for you.
          </p>
          <p className="font-display italic text-rose-deep">
            Less filing. More flowering.
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
