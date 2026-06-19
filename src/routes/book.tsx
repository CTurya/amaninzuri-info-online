import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Calendar, CheckCircle2, Clock, Mail, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book a free 30-minute consultation — Amani Nzuri" },
      {
        name: "description",
        content:
          "Schedule a free 30-minute discovery consultation with Amani Nzuri to scope your information management needs.",
      },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    challenge: "",
    preferredTime: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Consultation request — ${form.name}${form.company ? ` (${form.company})` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nPhone: ${form.phone}\nIndustry: ${form.industry}\nPreferred time: ${form.preferredTime}\n\nChallenge / context:\n${form.challenge}`,
    );
    window.location.href = `mailto:hello@amaninzuri.co.za?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-36 pb-16 border-b border-white/5">
          <div className="mx-auto max-w-5xl px-6 lg:px-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-card/60 border border-white/10 px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-accent">
              <Calendar className="h-3.5 w-3.5" /> Free 30-min discovery call
            </span>
            <h1 className="mt-6 font-display text-5xl md:text-6xl font-extrabold tracking-tight">
              Let's scope your <span className="text-accent">information challenge</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              Tell us a little about your records, current systems and goals. We'll come back within one business day
              with a confirmed time and a short pre-call brief.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-[1.1fr_1fr] gap-12">
            {/* Form */}
            <div className="rounded-3xl border border-white/10 bg-card/60 p-8 md:p-10 shadow-card">
              <h2 className="font-display text-2xl font-bold">Book your slot</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Submit the form and your email client will open with the details pre-filled to send to our team.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/5 p-6 text-sm">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <CheckCircle2 className="h-5 w-5" /> Almost there
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    Your email app should have opened with your request. If not, email us directly at{" "}
                    <a href="mailto:hello@amaninzuri.co.za" className="text-accent underline">
                      hello@amaninzuri.co.za
                    </a>{" "}
                    and we'll confirm a time within one business day.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                    <Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Industry" placeholder="e.g. Healthcare, Legal" value={form.industry} onChange={(v) => setForm({ ...form, industry: v })} />
                    <Field label="Preferred time" placeholder="e.g. Weekdays after 14:00 SAST" value={form.preferredTime} onChange={(v) => setForm({ ...form, preferredTime: v })} />
                  </div>
                  <label className="grid gap-1.5">
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">What would you like to solve?</span>
                    <textarea
                      required
                      rows={5}
                      value={form.challenge}
                      onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                      className="rounded-xl bg-background border border-white/10 px-4 py-3 text-sm outline-none focus:border-accent/60"
                      placeholder="Briefly describe your records, current systems, volumes and what success looks like."
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-rose px-6 py-3 text-sm font-semibold text-primary-foreground shadow-warm hover:opacity-95 transition-opacity"
                  >
                    Send request <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-card/40 p-7">
                <h3 className="font-display text-lg font-bold">What to expect</h3>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {[
                    "A 30-minute Teams or Google Meet call at a time that suits you",
                    "A quick audit of your current document handling and pain points",
                    "Clear next steps — no obligation, no sales pressure",
                    "A one-page summary emailed to you within 48 hours",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-white/10 bg-card/40 p-7 space-y-4">
                <h3 className="font-display text-lg font-bold">Prefer to reach out directly?</h3>
                <a href="mailto:hello@amaninzuri.co.za" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                  <Mail className="h-4 w-4 text-accent" /> hello@amaninzuri.co.za
                </a>
                <a href="tel:+27000000000" className="flex items-center gap-3 text-sm hover:text-accent transition-colors">
                  <Phone className="h-4 w-4 text-accent" /> +27 (0) 00 000 0000
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-accent" /> Mon–Fri · 08:00–17:00 SAST
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-rose/10 p-7">
                <h3 className="font-display text-lg font-bold">Not ready for a call?</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Browse our services and pricing to see how we work with SMEs.
                </p>
                <div className="mt-4 flex gap-3">
                  <Link to="/features" className="text-sm text-accent inline-flex items-center gap-1 hover:underline">
                    View services <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <Link to="/pricing" className="text-sm text-accent inline-flex items-center gap-1 hover:underline">
                    See pricing <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl bg-background border border-white/10 px-4 py-2.5 text-sm outline-none focus:border-accent/60"
      />
    </label>
  );
}
