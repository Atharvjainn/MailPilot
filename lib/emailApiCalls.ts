'use server'
import { prisma } from "@/lib/prisma"
import { getGoogleAccount } from "./prisma/db";

export const getEmails = async(userId : string) => {
    const res = await syncUserEmails(userId)
    console.log(res);
    
}



const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"

async function refreshAccessToken(account: any) {
  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      refresh_token: account.refreshToken,
      grant_type: "refresh_token"
    })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error("Failed to refresh token")
  }

  await prisma.account.update({
    where: { id: account.id },
    data: {
      accessToken: data.access_token,
      accessTokenExpiresAt: new Date(
        Date.now() + data.expires_in * 1000
      )
    }
  })

  return data.access_token
}

export async function syncUserEmails(userId: string) {
  // 1️⃣ Get Google account
  const account = await getGoogleAccount(userId)

  if (!account || !account.accessToken) {
    throw new Error("Google account not found")
  }

  let accessToken = account.accessToken

  // 2️⃣ Refresh token if expired
  if (
    account.accessTokenExpiresAt &&
    account.accessTokenExpiresAt < new Date()
  ) {
    accessToken = await refreshAccessToken(account)
  }

  // 3️⃣ Get or create sync state
  let syncState = await prisma.userSyncState.findUnique({
    where: { userId }
  })

  if (!syncState) {
    syncState = await prisma.userSyncState.create({
      data: {
        userId,
        lastSyncedAt: null
      }
    })
  }

  // 4️⃣ Build Gmail query
  let query =
    "in:inbox -category:promotions -category:social -category:forums"

  if (syncState.lastSyncedAt) {
    const unixSeconds = Math.floor(
      syncState.lastSyncedAt.getTime() / 1000
    )
    query += ` after:${unixSeconds}`
  } else {
    // First sync → last 1 day (for testing)
    query += " newer_than:1d"
  }

  let pageToken: string | null = null
  let insertedCount = 0

  do {
    const listRes : any = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=100&q=${encodeURIComponent(
        query
      )}&pageToken=${pageToken ?? ""}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    )

    if (!listRes.ok) {
      throw new Error("Failed to fetch message list")
    }

    const listData = await listRes.json()

    const emailsToInsert: any[] = []

    for (const msg of listData.messages || []) {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )

      const msgData = await msgRes.json()

      const headers = msgData.payload.headers

      const subject =
        headers.find((h: any) => h.name === "Subject")?.value || ""

      const snippet = msgData.snippet || ""

      const internalDate = msgData.internalDate
        ? new Date(Number(msgData.internalDate))
        : null

      emailsToInsert.push({
        gmailMessageId: msg.id,
        subject,
        snippet,
        internalDate,
        userId
      })
    }

    if (emailsToInsert.length > 0) {
      const result = await prisma.email.createMany({
        data: emailsToInsert,
        skipDuplicates: true
      })

      insertedCount += result.count
    }

    pageToken = listData.nextPageToken ?? null
  } while (pageToken)

  // 5️⃣ Update sync timestamp
  await prisma.userSyncState.update({
    where: { userId },
    data: {
      lastSyncedAt: new Date()
    }
  })

  return {
    success: true,
    inserted: insertedCount
  }
}
