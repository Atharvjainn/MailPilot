import cron from "node-cron"
import { prisma } from "@/lib/prisma"
import { getEmails } from "@/lib/emailApiCalls"

export function startDevCron() {
  if (process.env.NODE_ENV !== "development") return

  console.log("🟢 Dev cron started")

  cron.schedule("* * * * *", async () => {
    console.log("⏰ Running dev email sync...")

    const users = await prisma.user.findMany({
      include: { accounts: true }
    })

    for (const user of users) {
      const googleAccount = user.accounts.find(
        (acc) => acc.providerId === "google"
      )

      if (!googleAccount) continue

      await getEmails(user.id)
    }

    console.log("✅ Dev sync completed")
  })
}
