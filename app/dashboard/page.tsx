'use client'

import { signOutAction } from "@/lib/actions/auth-actions"
import { useRouter } from "next/navigation"

const page = () => {  
  const router = useRouter()
  const onclickhandler = async() => {
    await signOutAction()
    router.push('/')
  }
  return (
    <>
    <div className='flex justify-center items-center h-screen flex-col gap-2'>
      <h1 className='text-3xl font-bold'>Dashboard</h1>
      <button className="cursor-pointer text-3xl font-bold border-2 px-3 py-2 rounded-2xl" onClick={onclickhandler}>
        Logout
      </button>
    </div>
    </>
  )
}

export default page