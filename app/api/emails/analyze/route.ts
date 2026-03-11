import { auth } from "@/lib/auth"

export async function POST(req : Request) {
  const session = await auth.api.getSession({
    headers: req.headers
  })

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }
  const { emails } = await req.json()
  const data = {
    userId : session.user.id,
    emails : emails
  }
  try {
    const response = await fetch('http://127.0.0.1:8000/store-emails',{
      method : "POST",
      headers : {
        "Content-type" : "application/json"
      },
      body : JSON.stringify(
        data
      )
    })
    return Response.json(await response.json())
  } catch (error : any) {
    return new Response(error.message, { status: 500 })
  }
  

}