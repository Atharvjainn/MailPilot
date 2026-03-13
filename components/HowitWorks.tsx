
const COLORS = {
  bg: "#0A0F1E",
  bgCard: "#111827",
  bgCardHover: "#1a2234",
  border: "#1e2d45",
  primary: "#4F8EF7",
  primaryGlow: "rgba(79,142,247,0.15)",
  text: "#F1F5F9",
  textMuted: "#64748B",
  textDim: "#94A3B8",
  urgent: "#F87171",
  soon: "#FBBF24",
  normal: "#60A5FA",
  low: "#94A3B8",
};


const HowitWorks = () => {
  const steps = [
    { num: "01", title: "Connect", desc: "Securely link your Gmail or Outlook." },
    { num: "02", title: "Analyze", desc: "Our engine scans for actionable items." },
    { num: "03", title: "Execute", desc: "Tackle your prioritized timeline." },
  ];
  return (
    <section id="how-it-works" style={{ backgroundColor: COLORS.bgCard, borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}` }} className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Space_Grotesk'] tracking-tight" style={{ color: COLORS.text }}>Effortless workflow</h2>
          <p style={{ color: COLORS.textMuted }} className="text-lg">From chaotic inbox to structured timeline in seconds.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-6 left-[15%] right-[15%] h-px" style={{ background: `linear-gradient(90deg, transparent, ${COLORS.border}, transparent)` }} />
          
          {steps.map((s, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}`, color: COLORS.primary }} className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mb-6 shadow-xl">
                {s.num}
              </div>
              <h3 style={{ color: COLORS.text }} className="font-semibold text-lg mb-2 font-['Space_Grotesk']">{s.title}</h3>
              <p style={{ color: COLORS.textMuted }} className="text-sm max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowitWorks