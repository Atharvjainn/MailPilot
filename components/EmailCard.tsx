import { Paperclip, Star, Clock } from "lucide-react";
import { COLORS, URGENCY_CONFIG, UrgencyKey } from "../lib/config";
import { EMAILS } from "@/lib/utils";

export default function EmailCard({ email }: {email : typeof EMAILS[0]}) {
 const u = URGENCY_CONFIG[email.urgency];
  return (
    <div
      style={{ 
        backgroundColor: COLORS.bgCard, 
        border: `1px solid ${COLORS.border}`,
        borderLeft: `3px solid ${u.color}`
      }}
      className="p-4 rounded-xl flex gap-4 hover:bg-[#1a2234] transition-colors cursor-pointer group"
    >
      <div className="flex flex-col items-center gap-2 pt-1">
        <div style={{ backgroundColor: COLORS.bg, color: COLORS.textMuted, border: `1px solid ${COLORS.border}` }} className="w-9 h-9 rounded-lg flex items-center justify-center font-medium text-sm flex-shrink-0 group-hover:border-slate-600 transition-colors">
          {email.from[0]}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <span style={{ color: COLORS.text }} className="text-sm font-medium truncate">{email.from}</span>
            <span style={{ color: COLORS.textMuted }} className="text-xs flex-shrink-0 hidden sm:block truncate">{email.fromEmail}</span>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            {email.hasAttachment && <Paperclip className="w-3.5 h-3.5" style={{ color: COLORS.textDim }} />}
            {email.starred && <Star className="w-3.5 h-3.5 fill-current" style={{ color: COLORS.soon }} />}
            <span style={{ color: COLORS.textDim }} className="text-xs">{email.date}</span>
          </div>
        </div>

        <p style={{ color: COLORS.text }} className="text-sm font-semibold mb-1 truncate">{email.subject}</p>
        <p style={{ color: COLORS.textMuted }} className="text-sm leading-relaxed mb-3 line-clamp-1">{email.summary}</p>

        <div className="flex items-center gap-2">
          <span
            style={{ color: u.color, backgroundColor: `${u.color}15` }}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider"
          >
            {u.icon}
            {u.label}
          </span>
          <span style={{ color: COLORS.textMuted , backgroundColor: COLORS.bg }} className="flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded" >
            <Clock className="w-3.5 h-3.5" />
            {email.deadline}
          </span>
        </div>
      </div>
    </div>
  );
}