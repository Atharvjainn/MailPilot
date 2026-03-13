'use client'
import { Mail } from "lucide-react";
import { signInSocialAction } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";

const COLORS = {
  bg: "#0A0F1E",
  bgCard: "#111827",
  border: "#1e2d45",
  primary: "#4F8EF7",
  text: "#F1F5F9",
  textMuted: "#64748B",
  textDim: "#94A3B8",
};

export default function AuthPage() {
    const router = useRouter()
    const onclickhandler = async() => {
        await signInSocialAction('google')
    }


  return (
    <div
      style={{ backgroundColor: COLORS.bg }}
      className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-['Inter']"
    >
      {/* Glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-100 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-75 h-75 bg-indigo-500/8 rounded-full blur-[100px] pointer-events-none" />

      <div
        style={{
          backgroundColor: COLORS.bgCard,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 0 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)",
        }}
        className="w-full max-w-95 rounded-2xl p-10 relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mb-10 group"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${COLORS.primary}18`, border: `1px solid ${COLORS.primary}35` }}
          >
            <Mail className="w-4 h-4" style={{ color: COLORS.primary }} />
          </div>
          <span className="font-semibold text-base font-['Space_Grotesk']" style={{ color: COLORS.text }}>
            MailPilot
          </span>
        </button>

        {/* Heading */}
        <h1
          className="text-[26px] font-bold text-center tracking-tight mb-2 font-['Space_Grotesk']"
          style={{ color: COLORS.text }}
        >
          Get started
        </h1>
        <p className="text-sm text-center mb-10 leading-relaxed" style={{ color: COLORS.textMuted }}>
          Connect your Google account to scan your inbox and detect deadlines automatically.
        </p>

        {/* Google Button */}
        <button
          onClick={onclickhandler}
          style={{
            backgroundColor: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)",
          }}
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-semibold text-gray-800 hover:brightness-95 active:scale-[0.98] transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Continue with Google
        </button>

        {/* Divider */}
        <div className="w-full flex items-center gap-4 my-7">
          <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
          <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: COLORS.textMuted }}>
            why google?
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: COLORS.border }} />
        </div>

        {/* Benefit pills */}
        <div className="flex flex-wrap gap-2 justify-center">
          {["Read your emails", "Detect deadlines", "Sync in real-time"].map((text) => (
            <span
              key={text}
              className="text-[11px] px-3 py-1.5 rounded-full font-medium"
              style={{
                backgroundColor: `${COLORS.primary}12`,
                border: `1px solid ${COLORS.primary}25`,
                color: COLORS.textDim,
              }}
            >
              {text}
            </span>
          ))}
        </div>

        {/* Fine print */}
        <p className="text-[11px] text-center mt-8 leading-relaxed" style={{ color: COLORS.textMuted }}>
          By continuing, you agree to our{" "}
          <a href="#" className="underline underline-offset-2 hover:opacity-80" style={{ color: COLORS.textDim }}>
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-2 hover:opacity-80" style={{ color: COLORS.textDim }}>
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
