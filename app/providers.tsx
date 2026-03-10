'use client'

import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useRef } from "react"

const SYNC_INTERVAL_MS = 60 * 1000 // 1 minute

async function triggerEmailSync() {
  try {
    const response = await fetch("/api/emails/sync", { method: "POST" })
    const data = await response.json()
    console.log("Email sync response:", data)
  } catch (error) {
    console.error("Email sync failed:", error)
  }
}

export default function Providers({
    children,
} : {
    children : React.ReactNode
}){
    const { authuser, ischeckingauth, checkauth } = useAuthStore()
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (!authuser && !ischeckingauth) {
            checkauth()
        }
    }, [ischeckingauth])

    useEffect(() => {
        // Clear any existing interval first
        if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
        }

        if (authuser) {
            // Sync immediately when user logs in
            triggerEmailSync()

            // Then keep syncing every minute while they're logged in
            intervalRef.current = setInterval(() => {
                triggerEmailSync()
            }, SYNC_INTERVAL_MS)
        }

        // Cleanup on logout or unmount
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [authuser]) // re-runs when authuser changes (login/logout)

    return (
        <>
        {children}
        </>
    )
}