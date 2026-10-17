import { useState } from "react";
import { MdPeople, MdCampaign } from "react-icons/md";
import { FaHandHoldingHeart } from "react-icons/fa";
import logo from "assets/branding/haluan-logo.png";

const PILLARS = [
  {
    icon: <MdPeople className="h-5 w-5" />,
    title: "Community",
    desc:  "Connecting Palestinians and supporters across Malaysia",
  },
  {
    icon: <MdCampaign className="h-5 w-5" />,
    title: "Advocacy",
    desc:  "Raising awareness and championing justice for Palestine",
  },
  {
    icon: <FaHandHoldingHeart className="h-5 w-5" />,
    title: "Humanitarian Aid",
    desc:  "Coordinating donations, relief, and on-ground support",
  },
];

const ComingSoon = () => {
  const [email, setEmail]         = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes subtlePulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        .fade-up {
          opacity: 0;
          animation: fadeUp 0.8s cubic-bezier(.22,.68,0,1.1) forwards;
        }
        .pulse-dot { animation: subtlePulse 2s ease-in-out infinite; }
      `}</style>

      <section className="min-h-screen bg-white p-3 sm:p-5">
        <div
          className="relative flex min-h-[calc(100vh-40px)] flex-col overflow-hidden rounded-3xl bg-white"
          className="border border-brand-500/10 shadow-ring-brand"
        >

          {/* ── Background elements ── */}
          {/* Top glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 bg-glow-top-brand" />
          {/* Bottom-left glow */}
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-glow-circle-brand" />
          {/* Dot grid */}
          <div className="pointer-events-none absolute inset-0 bg-dot-brand-dark bg-[size:32px_32px] opacity-[0.18]" />
          {/* Watermark */}
          <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none overflow-hidden"
            style={{ opacity: 0.03 }}>
            <span className="text-[220px] font-black text-brand-800 leading-none">HALUAN</span>
          </div>

          {/* ── Header ── */}
          <header className="relative z-10 fade-up flex items-center justify-between px-6 py-5 sm:px-10"
            style={{ animationDelay: "0.05s" }}>
            <div className="flex items-center gap-3">
              <img src={logo} alt="Haluan" className="h-11 w-auto" />
              <div className="hidden sm:block">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 leading-tight">Haluan</p>
                <p className="text-[10px] font-medium tracking-wide text-brand-800">
                  هالوان
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-brand-500/20 bg-brand-500/[3%] px-3.5 py-1.5">
              <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-800">
                Coming Soon
              </span>
            </div>
          </header>

          {/* ── Main ── */}
          <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-12 text-center sm:px-10">

            {/* Org label */}
            <div className="fade-up mb-6 flex items-center gap-3" style={{ animationDelay: "0.1s" }}>
              <span className="h-px w-8 rounded bg-brand-500/25" />
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Official Member Portal
              </p>
              <span className="h-px w-8 rounded bg-brand-500/25" />
            </div>

            {/* Heading */}
            <h1 className="fade-up mb-3 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl"
              style={{ animationDelay: "0.2s" }}>
              Serving Our Community,
              <br />
              <span className="text-brand-800">Together.</span>
            </h1>

            {/* Mission */}
            <p className="fade-up mb-2 max-w-lg text-base leading-relaxed text-slate-500 sm:text-lg"
              style={{ animationDelay: "0.3s" }}>
              A unified platform for the Palestinian community in Malaysia — bringing members, events, advocacy, and humanitarian aid under one roof.
            </p>

            {/* Quote */}
            <p className="fade-up mb-10 max-w-sm text-sm italic text-slate-400"
              style={{ animationDelay: "0.38s" }}>
              "Stand for justice. Build community. Serve with purpose."
            </p>

            {/* Pillars */}
            <div className="fade-up mb-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
              style={{ animationDelay: "0.46s" }}>
              {PILLARS.map((p) => (
                <div key={p.title}
                  className="flex flex-col items-center gap-2 rounded-2xl border px-5 py-4 text-center"
                  className="border-brand-500/10 bg-brand-500/[2%]">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/[7%] text-brand-800">
                    {p.icon}
                  </div>
                  <p className="text-sm font-bold text-slate-800">{p.title}</p>
                  <p className="text-xs leading-relaxed text-slate-400">{p.desc}</p>
                </div>
              ))}
            </div>

           
          </main>

        </div>
      </section>
    </>
  );
};

export default ComingSoon;
