import { auth } from "@/lib/auth"
import { syncUserEmails } from "@/lib/emailApiCalls"

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: req.headers
  })

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  try {
    const result = await syncUserEmails(session.user.id)
    return Response.json(result)
  } catch (error: any) {
    return new Response(error.message, { status: 500 })
  }
}
