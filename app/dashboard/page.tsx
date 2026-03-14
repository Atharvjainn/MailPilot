'use client'
import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import EmailCard from "../../components/EmailCard";
import DashboardPage from "@/pages/DashboardPage";
import { EMAILS } from "../../lib/utils";

export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);

  const filtered = EMAILS.filter(
    e =>
      e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.from.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardPage />
  );
}