import { AlertCircle, AlertTriangle, Info, CheckCircle } from "lucide-react";

export const COLORS = {
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

export const URGENCY_CONFIG = {
  urgent: {
    label: "Urgent",
    color: COLORS.urgent,
    icon: <AlertCircle className="w-3.5 h-3.5" />,
  },
  soon: {
    label: "Soon",
    color: COLORS.soon,
    icon: <AlertTriangle className="w-3.5 h-3.5" />,
  },
  normal: {
    label: "This Week",
    color: COLORS.normal,
    icon: <Info className="w-3.5 h-3.5" />,
  },
  low: {
    label: "Upcoming",
    color: COLORS.low,
    icon: <CheckCircle className="w-3.5 h-3.5" />,
  },
} as const;

export type UrgencyKey = keyof typeof URGENCY_CONFIG;