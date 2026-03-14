import { Email } from "./generated/prisma/client";
import { UrgencyKey } from "./config";

type EmailBody = {
    id : string,
    subject : string | null,
    body : string | null
}

// id subject body internalDate
export const formatMails = (mails : Email[]) : EmailBody[] => {
    const formattedmails = mails.map((mail) => ({
        id : mail.gmailMessageId,
        subject : mail.subject,
        body : mail.snippet,
        receivedAt : mail.internalDate
    }))
    return formattedmails 
}



export const EMAILS = [
  {
    id: 1,
    from: "Sarah Chen",
    fromEmail: "sarah@acme.com",
    subject: "Q4 Report Final Review — Response Required",
    deadline: "Today, 5:00 PM",
    urgency: "urgent" as UrgencyKey,
    date: "10:42 AM",
    starred: true,
    hasAttachment: true,
    summary:
      "Please complete your section of the Q4 report before the board presentation.",
  },
];

