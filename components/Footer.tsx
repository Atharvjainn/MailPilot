import { Mail } from "lucide-react";
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

const Footer = () => {
  return (
    <footer style={{ backgroundColor: COLORS.bg, borderTop: `1px solid ${COLORS.border}` }} className="py-8 px-6 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Mail className="w-4 h-4" style={{ color: COLORS.textMuted }} />
        <span className="font-semibold font-['Space_Grotesk'] tracking-tight" style={{ color: COLORS.textMuted }}>MailPilot</span>
      </div>
      <p style={{ color: COLORS.textDim }} className="text-xs">© 2026 MailPilot. Designed for clarity.</p>
    </footer>
  );
}

export default Footer