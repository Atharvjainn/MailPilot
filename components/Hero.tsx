import { Zap,ArrowRight} from "lucide-react";
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


const Hero = () => {
    const router = useRouter()
   return (
    <section
      style={{ backgroundColor: COLORS.bg }}
      className="pt-40 pb-24 px-6 min-h-screen flex flex-col items-center text-center relative overflow-hidden"
    >
      {/* Background gradients */}
      <div style={{ background: `radial-gradient(circle at 50% 0%, ${COLORS.primaryGlow} 0%, transparent 70%)` }} className="absolute top-0 left-0 right-0 h-[600px] pointer-events-none" />
      
      <div style={{ border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bgCard }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium mb-8 text-blue-400">
        <Zap className="w-3.5 h-3.5" />
        <span>MailPilot 2.0 is now live</span>
      </div>

      <h1
        className="text-5xl md:text-7xl font-bold leading-tight max-w-4xl mb-6 font-['Space_Grotesk'] tracking-tight"
        style={{ color: COLORS.text }}
      >
        Your inbox, <br className="md:hidden" />
        <span style={{ 
          background: `linear-gradient(to right, ${COLORS.text}, ${COLORS.primary})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}>finally structured.</span>
      </h1>
      
      <p style={{ color: COLORS.textMuted }} className="text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-['Inter']">
        The intelligent email layer that automatically extracts deadlines, 
        organizes priorities, and ensures nothing slips through the cracks.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
        <button
          onClick={() => router.push("/auth")}
          style={{ backgroundColor: COLORS.text, color: COLORS.bg }}
          className="px-8 py-3.5 rounded-full font-semibold text-sm hover:opacity-90 transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          Connect Your Inbox <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => router.push("/dashboard")}
          style={{ color: COLORS.text, border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bgCard }}
          className="px-8 py-3.5 rounded-full font-medium text-sm hover:bg-white/5 transition-all w-full sm:w-auto justify-center"
        >
          View Live Demo
        </button>
      </div>

      {/* Floating Mockup */}
      <div className="relative w-full max-w-3xl mx-auto perspective-1000">
        <div 
          style={{ 
            backgroundColor: COLORS.bgCard, 
            border: `1px solid ${COLORS.border}`,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 40px ${COLORS.primaryGlow}`
          }} 
          className="rounded-xl overflow-hidden backdrop-blur-xl bg-opacity-80 transform rotate-x-2"
        >
          <div style={{ borderBottom: `1px solid ${COLORS.border}` }} className="px-4 py-3 flex items-center gap-2 bg-black/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex items-center justify-center w-1/2">
              <div style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }} className="px-3 py-1 rounded text-[10px] text-slate-400 w-full text-center truncate">
                mailpilot.app/dashboard
              </div>
            </div>
          </div>
          <div className="p-4 space-y-3 bg-gradient-to-b from-transparent to-black/10">
            {[
              { from: "Sarah Chen", subject: "Q4 Report Review", urgency: "urgent", color: COLORS.urgent },
              { from: "Alex Thompson", subject: "Contract Signing", urgency: "soon", color: COLORS.soon },
              { from: "HR Dept", subject: "Benefits Enrollment", urgency: "normal", color: COLORS.normal },
            ].map((email, i) => (
              <div key={i} style={{ backgroundColor: COLORS.bgCardHover, border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${email.color}` }} className="rounded-lg p-4 flex items-center gap-4">
                <div style={{ backgroundColor: COLORS.bg, color: COLORS.text }} className="w-8 h-8 rounded flex items-center justify-center font-medium text-xs flex-shrink-0">
                  {email.from[0]}
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <div style={{ color: COLORS.text }} className="font-medium text-sm truncate">{email.subject}</div>
                  <div style={{ color: COLORS.textMuted }} className="text-xs mt-1">{email.from}</div>
                </div>
                <div style={{ color: email.color, backgroundColor: `${email.color}15` }} className="text-[10px] font-medium px-2 py-1 rounded">
                  {email.urgency.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero