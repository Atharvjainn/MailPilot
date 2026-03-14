import { useState } from "react";
import Sidebar from "../components/Sidebar";
import EmailCard from "../components/EmailCard";
import { UrgencyKey } from "@/lib/config";
import { EMAILS } from "../lib/utils";
import { COLORS } from "@/lib/config";
import { Search,RefreshCw,Sparkles,Bell,Calendar,Filter } from "lucide-react";
import { useEmailStore } from "@/store/useEmailstore";

export default function DashboardPage() {
  const [fromDate, setFromDate] = useState("2026-12-01");
  const [toDate, setToDate] = useState("2026-12-31");
  const [typeFilter, setTypeFilter] = useState<"all" | UrgencyKey>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const {syncEmails,issyncing,analyzeEmails,isanalyzing} = useEmailStore()

  

  const filtered = EMAILS.filter(e => {
    const matchType = typeFilter === "all" || e.urgency === typeFilter;
    const matchSearch = !searchQuery || e.subject.toLowerCase().includes(searchQuery.toLowerCase()) || e.from.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0F1E] font-['Inter'] selection:bg-blue-500/30">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Top bar */}
        <div style={{ borderBottom: `1px solid ${COLORS.border}`, backgroundColor: "rgba(10, 15, 30, 0.8)" }} className="flex-shrink-0 px-8 py-5 flex items-center justify-between backdrop-blur-md z-10">
          <div>
            <h1 className="text-xl font-bold font-['Space_Grotesk'] tracking-tight" style={{ color: COLORS.text }}>Overview</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={syncEmails}
              style={{ border: `1px solid ${COLORS.border}`, color: COLORS.text, backgroundColor: COLORS.bgCard }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium hover:bg-white/5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${issyncing ? "animate-spin" : ""}`} style={{ color: COLORS.textMuted }} />
              {issyncing ? "Syncing" : "Sync"}
            </button>
            <button
              onClick={analyzeEmails}
              style={{ backgroundColor: COLORS.primary, color: "white" }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isanalyzing ? "animate-pulse text-yellow-300" : ""}`} />
              {isanalyzing ? "Analyzing..." : "Analyze"}
            </button>
            <div className="w-px h-6 mx-1" style={{ backgroundColor: COLORS.border }} />
            <button style={{ color: COLORS.textMuted }} className="p-1.5 rounded-md hover:bg-white/5 hover:text-white transition-colors relative">
              <Bell className="w-4 h-4" />
              <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex-shrink-0 px-8 py-4 flex flex-col lg:flex-row items-start lg:items-center gap-4 z-10">
          <div style={{ border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.bgCard }} className="flex items-center gap-2 px-3 py-2 rounded-lg w-full lg:w-72 focus-within:border-blue-500/50 transition-colors">
            <Search className="w-4 h-4 flex-shrink-0" style={{ color: COLORS.textDim }} />
            <input
              type="text"
              placeholder="Search subjects or senders..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ color: COLORS.text }}
              className="bg-transparent outline-none text-sm w-full placeholder:text-slate-600"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <div className="flex bg-[#111827] rounded-lg p-1 border border-[#1e2d45]">
              {([
                { key: "all", label: "All" },
                { key: "urgent", label: "Urgent" },
                { key: "soon", label: "Soon" },
              ] as const).map(f => (
                <button
                  key={f.key}
                  onClick={() => setTypeFilter(f.key)}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${typeFilter === f.key ? 'shadow-sm' : 'hover:text-white'}`}
                  style={{
                    backgroundColor: typeFilter === f.key ? COLORS.border : "transparent",
                    color: typeFilter === f.key ? COLORS.text : COLORS.textMuted,
                  }}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 bg-[#111827] border border-[#1e2d45] rounded-lg px-3 py-1.5">
              <Calendar className="w-3.5 h-3.5" style={{ color: COLORS.textDim }} />
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                className="bg-transparent text-xs outline-none cursor-pointer"
                style={{ color: COLORS.textMuted, colorScheme: "dark" }}
              />
              <span style={{ color: COLORS.textDim }} className="text-xs">-</span>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                className="bg-transparent text-xs outline-none cursor-pointer"
                style={{ color: COLORS.textMuted, colorScheme: "dark" }}
              />
            </div>
          </div>
        </div>

        {/* Email list */}
        <div className="flex-1 overflow-y-auto px-8 pb-8 z-10">
          <div className=" mx-auto space-y-3">
            {filtered.length > 0 ? (
              filtered.map(e => <EmailCard key={e.id} email={e} />)
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: COLORS.bgCard, border: `1px solid ${COLORS.border}` }}>
                  <Filter className="w-6 h-6" style={{ color: COLORS.textMuted }} />
                </div>
                <p style={{ color: COLORS.text }} className="text-base font-medium font-['Space_Grotesk']">No deadlines found</p>
                <p style={{ color: COLORS.textMuted }} className="text-sm mt-1 max-w-sm">
                  We couldn't find any actionable emails matching your current filters.
                </p>
                <button
                  onClick={() => { setTypeFilter("all"); setSearchQuery(""); }}
                  className="mt-6 text-sm font-medium hover:underline"
                  style={{ color: COLORS.primary }}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}