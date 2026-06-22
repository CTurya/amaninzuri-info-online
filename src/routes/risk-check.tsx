import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ArrowRight, ClipboardCheck, CircleCheck as CheckCircle2, TriangleAlert as AlertTriangle, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/risk-check")({
  head: () => ({
    meta: [
      { title: "Free Records & Compliance Risk Check — Amani Nzuri" },
      {
        name: "description",
        content:
          "Take our free 2-minute Records & Compliance Risk Check. Get an instant snapshot of where your organisation stands — no signup required.",
      },
    ],
  }),
  component: RiskCheckPage,
});

function RiskCheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="pt-36 pb-20 bg-gradient-soft">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="grid h-16 w-16 mx-auto place-items-center rounded-2xl bg-blush text-rose-deep">
            <ClipboardCheck className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl font-medium leading-tight text-balance">
            Records & Compliance <span className="italic text-rose-deep">Risk Check</span>
          </h1>
          <p className="mt-5 text-lg text-foreground/70 max-w-xl mx-auto">
            Answer 10 quick questions and get an instant snapshot of where your organisation stands. No signup required.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl bg-card p-8 md:p-10 ring-1 ring-warm shadow-card">
            <RiskCheckForm />
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream/60 border-y border-warm">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-display text-2xl text-center">What you'll discover</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-card ring-1 ring-warm shadow-soft">
              <CheckCircle2 className="h-5 w-5 text-rose-deep shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Records readiness</p>
                <p className="mt-1 text-sm text-foreground/70">How organised and accessible your records are.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-card ring-1 ring-warm shadow-soft">
              <ShieldCheck className="h-5 w-5 text-rose-deep shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">POPIA posture</p>
                <p className="mt-1 text-sm text-foreground/70">Where you stand on data protection compliance.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-5 rounded-2xl bg-card ring-1 ring-warm shadow-soft">
              <AlertTriangle className="h-5 w-5 text-rose-deep shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Risk areas</p>
                <p className="mt-1 text-sm text-foreground/70">Gaps that could cause problems with auditors or funders.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 text-center">
        <p className="text-foreground/70">Prefer to talk it through?</p>
        <Link
          to="/book"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/85 transition-colors"
        >
          Book a free consultation <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}

const questions = [
  {
    id: "q1",
    text: "Can you locate any document from the past 5 years within 5 minutes?",
    category: "records",
  },
  {
    id: "q2",
    text: "Do you have a documented records retention schedule?",
    category: "records",
  },
  {
    id: "q3",
    text: "Are your records backed up and stored securely off-site or in the cloud?",
    category: "records",
  },
  {
    id: "q4",
    text: "Do you have a designated Information Officer registered with the Information Regulator?",
    category: "popia",
  },
  {
    id: "q5",
    text: "Do you have a PAIA manual submitted to the Information Regulator?",
    category: "popia",
  },
  {
    id: "q6",
    text: "Do you have written consent from individuals before processing their personal information?",
    category: "popia",
  },
  {
    id: "q7",
    text: "Do you have documented procedures for handling data subject access requests?",
    category: "popia",
  },
  {
    id: "q8",
    text: "Is there a clear process for reporting data breaches within 72 hours?",
    category: "popia",
  },
  {
    id: "q9",
    text: "Have all staff completed POPIA awareness training in the past 12 months?",
    category: "governance",
  },
  {
    id: "q10",
    text: "Do you conduct regular (at least annual) reviews of your information management practices?",
    category: "governance",
  },
];

import { useState } from "react";
import { toast } from "sonner";

function RiskCheckForm() {
  const [answers, setAnswers] = useState<Record<string, boolean | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (qId: string, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [qId]: value }));
  };

  const allAnswered = questions.every((q) => answers[q.id] !== undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAnswered) {
      toast.error("Please answer all questions");
      return;
    }
    setSubmitted(true);
  };

  const yesCount = Object.values(answers).filter((a) => a === true).length;
  const score = Math.round((yesCount / questions.length) * 100);

  const getRiskLevel = () => {
    if (score >= 80) return { label: "Low Risk", color: "text-muted-foreground" };
    if (score >= 60) return { label: "Moderate Risk", color: "text-accent-foreground" };
    if (score >= 40) return { label: "Elevated Risk", color: "text-destructive" };
    return { label: "High Risk", color: "text-destructive" };
  };

  if (submitted) {
    return (
      <div className="text-center">
        <div className="grid h-20 w-20 mx-auto place-items-center rounded-full bg-blush text-rose-deep">
          <span className="font-display text-4xl font-medium">{score}%</span>
        </div>
        <h3 className="mt-6 font-display text-2xl">Your Readiness Score</h3>
        <p className={`mt-2 text-lg font-medium ${getRiskLevel().color}`}>{getRiskLevel().label}</p>
        <p className="mt-4 text-foreground/70 max-w-md mx-auto">
          {score >= 80
            ? "You're in good shape! A few refinements could make your records even more audit-ready."
            : score >= 60
              ? "You have some solid foundations, but there are gaps that could cause issues during an audit or compliance review."
              : "There are significant gaps that could put your organisation at risk. We recommend addressing these urgently."}
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/book"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/85 transition-colors"
          >
            Book a free consultation <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setAnswers({});
            }}
            className="inline-flex items-center justify-center rounded-full border border-warm bg-card px-6 py-3 text-sm font-medium hover:bg-cream transition-colors"
          >
            Retake the check
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="p-5 rounded-2xl bg-background ring-1 ring-warm">
            <p className="text-sm font-medium">
              <span className="text-foreground/50 mr-2">{idx + 1}.</span>
              {q.text}
            </p>
            <div className="mt-3 flex gap-3">
              <button
                type="button"
                onClick={() => handleAnswer(q.id, true)}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  answers[q.id] === true
                    ? "bg-rose-deep text-primary-foreground"
                    : "bg-card ring-1 ring-warm hover:bg-blush"
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => handleAnswer(q.id, false)}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  answers[q.id] === false
                    ? "bg-foreground text-background"
                    : "bg-card ring-1 ring-warm hover:bg-muted"
                }`}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={!allAnswered}
        className="mt-8 w-full rounded-full bg-gradient-rose px-6 py-4 text-sm font-medium text-primary-foreground shadow-warm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        See My Results
      </button>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        {Object.keys(answers).filter((k) => answers[k] !== undefined).length} of {questions.length} questions answered
      </p>
    </form>
  );
}
