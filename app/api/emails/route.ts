import { auth } from "@/lib/auth";
import { getGoogleAccount } from "@/lib/prisma/db";

//This is the main call of the fetch emails
export async function GET(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (!session?.user.id) return new Response("Unauthorized", { status: 401 });
    const accessToken = (await getGoogleAccount(session.user.id)).accessToken;
    

    //chatgpt
   const query = "in:inbox newer_than:2m -category:promotions -category:social -category:forums"

    const listRes = await fetch(
    `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=30&q=${encodeURIComponent(query)}`,
    {
        headers: {
        Authorization: `Bearer ${accessToken}`
        }
    }
    )


    if (!listRes.ok) {
      return new Response("Failed to fetch messages", { status: 500 });
    }

    const listData = await listRes.json();

    const emails = [];

    // 4️⃣ Fetch each message details
    for (const msg of listData.messages || []) {
      const msgRes = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const msgData = await msgRes.json();

      const headers = msgData.payload.headers;

      const subject =
        headers.find((h: any) => h.name === "Subject")?.value || "";

      const snippet = msgData.snippet || "";

      emails.push({
        id: msg.id,
        subject,
        body: snippet,
      });
    }

    return Response.json({ emails });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong in the api call");
  }
}
