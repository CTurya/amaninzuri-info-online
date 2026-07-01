import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

const BRAND_EMAIL = "info@amaninzuri-info.online";
const PINK = "#ff1aa3";
const PINK_SOFT = "#ffe6f4";
const INK = "#0e0e0e";
const BG = "#fff7fb";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Amani Nzuri — Information Management for NGOs & SMEs" },
      {
        name: "description",
        content:
          "Amani Nzuri helps NGOs and SMEs across South Africa establish clear, POPIA-compliant information practices. Book your free 30-minute consultation.",
      },
      { property: "og:title", content: "Amani Nzuri — Information Management for NGOs & SMEs" },
      {
        property: "og:description",
        content:
          "POPIA specialists. Audit-ready information & records management for impact-driven organisations in South Africa.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

type FormState = {
  name: string;
  email: string;
  organisation: string;
  phone: string;
  topic: string;
  preferredDate: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  organisation: "",
  phone: "",
  topic: "Information & Records Audit",
  preferredDate: "",
  message: "",
};

function Index() {
  return (
    <div
      style={{
        backgroundColor: BG,
        color: INK,
        fontFamily: "'Inter', system-ui, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Nav />
      <Hero />
      <Trust />
      <Services />
      <ConsultationSection />
      <Footer />
      <style>{`
        html, body { overflow-x: hidden; max-width: 100%; }
        *, *::before, *::after { box-sizing: border-box; }
        img, svg, video { max-width: 100%; height: auto; }
        input, select, textarea, button { max-width: 100%; }
        @media (max-width: 640px) {
          section { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media (max-width: 360px) {
          section { padding-left: 12px !important; padding-right: 12px !important; }
        }
      `}</style>
    </div>
  );
}


function Nav() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(255, 247, 251, 0.85)",
        borderBottom: `1px solid ${PINK_SOFT}`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "14px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <a href="#top" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: INK, minWidth: 0 }}>
          <div
            style={{
              width: 36,
              height: 36,
              flexShrink: 0,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${PINK}, #ff66c4)`,
              display: "grid",
              placeItems: "center",
              color: "white",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
            }}
          >
            A
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, whiteSpace: "nowrap" }}>
            Amani Nzuri
          </span>
        </a>
        <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="#services" className="nav-hide-sm" style={navLink}>Services</a>
          <a href="#about" className="nav-hide-sm" style={navLink}>About</a>
          <a href="#contact" className="nav-cta" style={ctaBtn}>
            <span className="nav-cta-full">Book Free 30-Min Consultation</span>
            <span className="nav-cta-short">Book Consultation</span>
          </a>
        </nav>
      </div>
      <style>{`
        .nav-cta-short { display: none; }
        @media (max-width: 640px) {
          .nav-hide-sm { display: none !important; }
          .nav-cta-full { display: none; }
          .nav-cta-short { display: inline; }
          .nav-cta { padding: 10px 14px !important; font-size: 13px !important; }
        }
      `}</style>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" style={{ padding: "clamp(40px, 8vw, 80px) 24px clamp(32px, 6vw, 60px)" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr",
          gap: 48,
          alignItems: "center",
        }}
        className="hero-grid"
      >
        <div>
          <span style={pill}>Johannesburg · Gauteng · South Africa</span>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 7vw, 72px)",
              lineHeight: 1.08,
              fontWeight: 700,
              margin: "20px 0 16px",
              wordBreak: "break-word",
            }}
          >
            Bringing <em style={{ color: PINK, fontStyle: "italic" }}>order</em> &amp; clarity to your information
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.6, color: "#444", maxWidth: 540 }}>
            Amani Nzuri helps NGOs and SMEs across South Africa establish clear, compliant
            information practices — so your organisation is always audit-ready, compliant, and confident.
          </p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#contact" style={ctaBtn}>Book your free 30-min consultation</a>
            <a href="#services" style={ghostBtn}>Our services</a>
          </div>
        </div>
        <div
          style={{
            background: "white",
            borderRadius: 24,
            padding: 32,
            boxShadow: `0 30px 80px -30px ${PINK}40`,
            border: `1px solid ${PINK_SOFT}`,
          }}
        >
          <div
            style={{
              aspectRatio: "1",
              borderRadius: 16,
              background: `radial-gradient(circle at 30% 30%, ${PINK_SOFT}, white)`,
              display: "grid",
              placeItems: "center",
              padding: 32,
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 36,
                  fontWeight: 700,
                  color: PINK,
                  letterSpacing: 2,
                }}
              >
                AMANI<br />NZURI
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  letterSpacing: 3,
                  color: "#666",
                }}
              >
                INFORMATION MANAGEMENT CONSULTING
              </div>
              <div style={{ marginTop: 24, fontSize: 12, color: PINK, fontWeight: 600 }}>ESTD 2024</div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: "🏆", title: "100% B-BBEE", sub: "Compliant" },
    { icon: "✍", title: "100% Black", sub: "Female Owned" },
    { icon: "📋", title: "POPIA", sub: "Specialists" },
    { icon: "📍", title: "Based in", sub: "Johannesburg" },
    { icon: "🌍", title: "Serving", sub: "SA Nationally" },
  ];
  return (
    <section style={{ padding: "32px 24px", borderTop: `1px solid ${PINK_SOFT}`, borderBottom: `1px solid ${PINK_SOFT}` }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16,
        }}
      >
        {items.map((it) => (
          <div key={it.title} style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontSize: 22 }}>{it.icon}</div>
            <div style={{ fontWeight: 700, marginTop: 6 }}>{it.title}</div>
            <div style={{ fontSize: 13, color: "#666" }}>{it.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      n: "01",
      title: "Information & Records Audit",
      desc: "A comprehensive review of your current information landscape — identifying gaps, risks, and opportunities before your next audit.",
      tag: "Most popular",
    },
    {
      n: "02",
      title: "Records Management Systems",
      desc: "Design and implementation of practical records systems that match how your team actually works.",
    },
    {
      n: "03",
      title: "POPIA Compliance",
      desc: "End-to-end POPIA readiness — policies, registers, data flows, and staff training tailored to your organisation.",
    },
    {
      n: "04",
      title: "Data Analytics & Reporting",
      desc: "Turn your existing data into clear dashboards and reports that drive better decisions and donor confidence.",
    },
  ];
  return (
    <section id="services" style={{ padding: "80px 24px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={pill}>What we do</span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              margin: "16px 0 12px",
            }}
          >
            Our services
          </h2>
          <p style={{ color: "#555", maxWidth: 640, margin: "0 auto" }}>
            End-to-end information management solutions tailored for NGOs and SMEs across South Africa.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 20,
          }}
        >
          {services.map((s) => (
            <div
              key={s.n}
              style={{
                background: "white",
                borderRadius: 20,
                padding: 28,
                border: `1px solid ${PINK_SOFT}`,
                position: "relative",
              }}
            >
              {s.tag && (
                <span
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: PINK,
                    color: "white",
                    fontSize: 11,
                    padding: "4px 10px",
                    borderRadius: 999,
                    fontWeight: 600,
                  }}
                >
                  {s.tag}
                </span>
              )}
              <div style={{ fontFamily: "'Playfair Display', serif", color: PINK, fontSize: 28, fontWeight: 700 }}>
                {s.n}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, margin: "8px 0 12px", fontWeight: 700 }}>
                {s.title}
              </h3>
              <p style={{ color: "#555", lineHeight: 1.6, fontSize: 15 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationSection() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const mailtoHref = useMemo(() => {
    const subject = `Free 30-min Consultation Request — ${form.name || "[Name]"}`;
    const body = [
      "Hello Amani Nzuri team,",
      "",
      "I'd like to book a free 30-minute consultation. My details:",
      "",
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Organisation: ${form.organisation || "—"}`,
      `Phone: ${form.phone || "—"}`,
      `Service of interest: ${form.topic}`,
      `Preferred date/time: ${form.preferredDate || "—"}`,
      "",
      "What I'd like to discuss:",
      form.message || "—",
      "",
      "Thank you,",
      form.name,
    ].join("\n");
    return `mailto:${BRAND_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [form]);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid email";
    if (!form.message.trim()) e.message = "Tell us briefly what you'd like to discuss";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    window.location.href = mailtoHref;
  };

  return (
    <section id="contact" style={{ padding: "80px 24px", background: "white" }}>
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1.3fr",
          gap: 48,
          alignItems: "start",
        }}
        className="contact-grid"
      >
        <div>
          <span style={pill}>Let's talk</span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 700,
              margin: "16px 0 16px",
              lineHeight: 1.1,
            }}
          >
            Book your free 30-min consultation
          </h2>
          <p style={{ color: "#555", lineHeight: 1.6 }}>
            Tell us a little about your organisation. We'll reply within one business day to confirm a time.
          </p>
          <div style={{ marginTop: 28, padding: 20, borderRadius: 16, background: PINK_SOFT }}>
            <div style={{ fontSize: 12, letterSpacing: 2, color: PINK, fontWeight: 700 }}>EMAIL</div>
            <a
              href={`mailto:${BRAND_EMAIL}`}
              style={{ display: "block", marginTop: 4, color: INK, fontWeight: 600, textDecoration: "none" }}
            >
              {BRAND_EMAIL}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: 14 }} noValidate>
          <Row>
            <Field label="Full name *" error={errors.name}>
              <input style={input} value={form.name} onChange={update("name")} maxLength={100} required />
            </Field>
            <Field label="Email *" error={errors.email}>
              <input
                type="email"
                style={input}
                value={form.email}
                onChange={update("email")}
                maxLength={255}
                required
              />
            </Field>
          </Row>
          <Row>
            <Field label="Organisation">
              <input style={input} value={form.organisation} onChange={update("organisation")} maxLength={150} />
            </Field>
            <Field label="Phone">
              <input style={input} value={form.phone} onChange={update("phone")} maxLength={30} />
            </Field>
          </Row>
          <Row>
            <Field label="Service of interest">
              <select style={input} value={form.topic} onChange={update("topic")}>
                <option>Information & Records Audit</option>
                <option>Records Management Systems</option>
                <option>POPIA Compliance</option>
                <option>Data Analytics & Reporting</option>
                <option>Not sure yet</option>
              </select>
            </Field>
            <Field label="Preferred date / time">
              <input
                style={input}
                placeholder="e.g. Tue 2 Jul, 10:00"
                value={form.preferredDate}
                onChange={update("preferredDate")}
                maxLength={80}
              />
            </Field>
          </Row>
          <Field label="What would you like to discuss? *" error={errors.message}>
            <textarea
              style={{ ...input, minHeight: 120, resize: "vertical" }}
              value={form.message}
              onChange={update("message")}
              maxLength={1500}
              required
            />
          </Field>
          <button type="submit" style={{ ...ctaBtn, border: "none", cursor: "pointer", fontSize: 15 }}>
            Send consultation request →
          </button>
          <p style={{ fontSize: 12, color: "#777", marginTop: 4 }}>
            Submitting opens your email app pre-filled to <strong>{BRAND_EMAIL}</strong>. Just press send.
          </p>
        </form>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="form-row">
      {children}
      <style>{`@media (max-width: 560px){ .form-row{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "grid", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{label}</span>
      {children}
      {error && <span style={{ fontSize: 12, color: "#d6006f" }}>{error}</span>}
    </label>
  );
}

function Footer() {
  return (
    <footer style={{ padding: "32px 24px", borderTop: `1px solid ${PINK_SOFT}`, background: BG }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          justifyContent: "space-between",
          alignItems: "center",
          color: "#666",
          fontSize: 13,
        }}
      >
        <div>© {new Date().getFullYear()} Amani Nzuri Information Management Consulting</div>
        <a href={`mailto:${BRAND_EMAIL}`} style={{ color: PINK, textDecoration: "none", fontWeight: 600 }}>
          {BRAND_EMAIL}
        </a>
      </div>
    </footer>
  );
}

const navLink: React.CSSProperties = {
  color: INK,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
};

const ctaBtn: React.CSSProperties = {
  display: "inline-block",
  background: PINK,
  color: "white",
  padding: "12px 22px",
  borderRadius: 999,
  fontWeight: 600,
  textDecoration: "none",
  boxShadow: `0 10px 30px -10px ${PINK}`,
  fontSize: 14,
};

const ghostBtn: React.CSSProperties = {
  display: "inline-block",
  background: "transparent",
  color: PINK,
  padding: "12px 22px",
  borderRadius: 999,
  fontWeight: 600,
  textDecoration: "none",
  border: `1.5px solid ${PINK}`,
  fontSize: 14,
};

const pill: React.CSSProperties = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: 999,
  background: PINK_SOFT,
  color: PINK,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1,
  textTransform: "uppercase",
};

const input: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 12,
  border: `1px solid ${PINK_SOFT}`,
  background: "white",
  fontSize: 14,
  fontFamily: "inherit",
  color: INK,
  outline: "none",
};


