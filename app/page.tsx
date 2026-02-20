'use client'
import { useRouter } from "next/navigation";
import { signInSocialAction } from "@/lib/actions/auth-actions";


export default function Home() {
  const router = useRouter()
  const onclickhandler = async() => {
    await signInSocialAction('google')
    router.push('/dashboard ')
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <button className="cursor-pointer text-3xl font-bold border-2 px-3 py-2 rounded-2xl" onClick={onclickhandler}>
        Login
      </button>
    </div>
  );
}
