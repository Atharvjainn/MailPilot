'use client'

import { signOutAction } from "@/lib/actions/auth-actions"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react"
import { useEmailStore } from "@/store/useEmailstore"
import { Loader } from "lucide-react"
import { getemails,analyzeEmails } from "@/lib/actions/email-actions"



const page = () => {  
  const {authuser} = useAuthStore()
  const {issyncing,syncEmails} = useEmailStore()

  useEffect(() => {
    console.log(authuser)
    // getEmails()
  },[authuser])
  
  const router = useRouter()
  const onclickhandler = async() => {
    await signOutAction()
    router.push('/')
  }
  return (
    <>
    <div className='flex justify-center items-center h-screen flex-col gap-2'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <div className="flex justify-center items-center gap-4">
      <button className="cursor-pointer text-3xl font-bold border-2 px-3 py-2 rounded-2xl" onClick={onclickhandler}>
        Logout
      </button>
      {issyncing ?
      <Loader/> :
      <button className="cursor-pointer text-3xl font-bold border-2 px-3 py-2 rounded-2xl" onClick={syncEmails}>
      SYNC EMAILS
      </button>}
      
      <button className="cursor-pointer text-3xl font-bold border-2 px-3 py-2 rounded-2xl" onClick={analyzeEmails}>
        ANALYZE EMAILS
      </button>
      </div>

    </div>
    </>
  )
}

export default page