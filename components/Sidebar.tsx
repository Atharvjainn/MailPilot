import { useState } from "react";
import { Mail, Inbox, Star, CheckCircle, AlertCircle, Settings, LogOut } from "lucide-react";
import { COLORS } from "../lib/config";
import { signOutAction } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";


export default function Sidebar() {
  
  const [active, setActive] = useState("deadlines");
  const router = useRouter()
  const navItems = [
    { id: "all", icon: <Inbox className="w-4 h-4" />, label: "Inbox", count: null },
    { id: "deadlines", icon: <AlertCircle className="w-4 h-4" />, label: "Deadlines", count: 5 },
    { id: "starred", icon: <Star className="w-4 h-4" />, label: "Starred", count: 2 },
    { id: "resolved", icon: <CheckCircle className="w-4 h-4" />, label: "Done", count: null },
  ];

  const handleSignOut = async () => {
    await signOutAction();
    router.push('/')
  }

  return (
    <aside style={{ backgroundColor: COLORS.bg, borderRight: `1px solid ${COLORS.border}` }} className="w-64 flex flex-col h-full py-6">
      <div className="px-6 flex items-center gap-2.5 mb-10 cursor-pointer" onClick={() => router.push("/")}>
        <div style={{ backgroundColor: COLORS.primary }} className="w-8 h-8 rounded flex items-center justify-center">
          <Mail className="w-4 h-4 text-white" />
        </div>
        <span className="text-white text-lg font-bold font-['Space_Grotesk'] tracking-tight">MailPilot</span>
      </div>

      <div className="px-4 mb-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider mb-2 px-2" style={{ color: COLORS.textMuted }}>Views</p>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            style={{
              backgroundColor: active === item.id ? COLORS.bgCard : "transparent",
              color: active === item.id ? COLORS.text : COLORS.textMuted,
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-3">{item.icon}{item.label}</span>
            {item.count != null && (
              <span 
                style={{ 
                  backgroundColor: active === item.id ? COLORS.primary : COLORS.border,
                  color: active === item.id ? "white" : COLORS.textDim
                }} 
                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              >
                {item.count}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="px-4 pt-4 mt-auto">
        <div className="border-t pt-4 space-y-1" style={{ borderColor: COLORS.border }}>
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
            style={{ color: COLORS.textMuted }}
          >
            <Settings className="w-4 h-4" /> Settings
          </button>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors text-sm font-medium"
            style={{ color: COLORS.textMuted }}
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
        
        <div className="flex items-center gap-3 px-3 py-3 mt-4 rounded-xl" style={{ backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}>
          <div style={{ backgroundColor: `${COLORS.primary}20`, color: COLORS.primary }} className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
            J
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate" style={{ color: COLORS.text }}>Jane Doe</p>
            <p className="text-[10px] truncate" style={{ color: COLORS.textDim }}>jane@example.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}