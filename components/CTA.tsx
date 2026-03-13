import { useRouter } from "next/navigation";
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
}

const CTA = () => {
    const router = useRouter()
 return (
    <section style={{ backgroundColor: COLORS.bg }} className="py-32 px-6 text-center relative overflow-hidden">
      <div style={{ background: `radial-gradient(circle at 50% 50%, ${COLORS.primaryGlow} 0%, transparent 60%)` }} className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-['Space_Grotesk'] tracking-tight" style={{ color: COLORS.text }}>
          Ready to regain focus?
        </h2>
        <p className="text-lg mb-10" style={{ color: COLORS.textMuted }}>
          Join top performers who rely on MailPilot to manage their commitments.
        </p>
        <button
          onClick={() => router.push("/auth")}
          className="px-10 py-4 rounded-full font-bold text-sm transition-all hover:scale-105"
          style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
        >
          Start for free
        </button>
      </div>
    </section>
  );
}

export default CTA