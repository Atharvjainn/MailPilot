'use server'
import { redirect } from "next/navigation"
import { signinSocialService, signOutService } from "@/services/auth-services"
import { headers } from "next/headers"

export const signInSocialAction = async(provider : 'google') => {
    let url : string
    try {
        url = await signinSocialService(provider)
    } catch (error) {
        if(error instanceof Error){
            return {message : error.message}
        }
        return {message : "Unexpected error"}
    }
    redirect(url)
    
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