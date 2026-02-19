import { redirect } from "next/navigation"
import { signinSocialService, signOutService } from "@/services/auth-services"
import { headers } from "next/headers"

export const signInSocialAction = async(provider : 'google') => {
    try {
        const url = await signinSocialService(provider)
        redirect(url)
    } catch (error) {
        if(error instanceof Error){
            return {message : error.message}
        }
        return {message : "Unexpected error"}
    }
    
}  

export const signOutAction = async () => {
    try {
        const reqheaders = await headers()
        const result = await signOutService(reqheaders)
        return result
    } catch (error) {
        if(error instanceof Error){
            return { message : error.message}
        }
        return {message : "Unexpected error"}
    }
}