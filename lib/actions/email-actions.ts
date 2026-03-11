'use client'

import { Email } from "../generated/prisma/client"
import { formatMails } from '../utils'

export async function triggerEmailSync() {
  try {
    const response = await fetch("/api/emails/sync", { method: "POST" })
    const data = await response.json()
    console.log("Email sync response:",data)
  } catch (error) {
    console.error("Email sync failed:", error)
  }
}

// This is a temporary function just for testing purposes
export const getemails = async() => { 
  try {
    const response = await fetch('/api/emails/sync' ,{method : "GET"})
    const data = await response.json()
    // console.log('emails',data)
    return data as Email[]
  } catch (error) {
    console.error('error h bhai')
  }
}


export const analyzeEmails = async() => {
  const emails = await getemails()
  const formattedEmails = formatMails(emails!)
  try {
    const response = await fetch('/api/emails/analyze',{
    method : "POST",
    headers : {
      'Content-type' : 'application/json'
    },
    body : JSON.stringify({
      emails : formattedEmails
    })})
    console.log('yeh response h bina json',response)
    const data = await response.json()
    console.log("agya response",data)
  } 
  catch (error) {
    console.log("error h")
  }

}