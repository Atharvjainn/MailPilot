import { Email } from "./generated/prisma/client";

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
