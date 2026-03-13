'use client'
import { Mail,ChevronRight } from "lucide-react";
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
};


const Navbar = () => {
    const router = useRouter()
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5 px-6 pointer-events-none">
      <nav
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.85)",
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
        className="w-full max-w-3xl rounded-full px-4 py-2.5 flex items-center justify-between pointer-events-auto"
      >
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push("/")}>
          <div
            style={{ backgroundColor: COLORS.primary, boxShadow: `0 0 10px ${COLORS.primaryGlow}` }}
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Mail className="w-3.5 h-3.5 text-white" />
          </div>
          <span style={{ color: COLORS.text }} className="text-base font-bold font-['Space_Grotesk'] tracking-tight">
            MailPilot
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <a href="#features" style={{ color: COLORS.textMuted }} className="text-sm font-medium hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" style={{ color: COLORS.textMuted }} className="text-sm font-medium hover:text-white transition-colors">How it works</a>
        </div>

        <button
          onClick={() => router.push("/auth")}
          style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
          className="px-5 py-2 rounded-full text-sm font-semibold hover:opacity-90 active:scale-95 transition-all"
        >
          Sign In
        </button>
      </nav>
    </div>
  );

}

export default Navbar


