import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export const signinSocialService = async(provider : 'google') : Promise<string> => {
    try {
        const { url } = await auth.api.signInSocial({
        body : {
            provider,callbackURL : '/'
        }
    })
        if(!url) throw new Error('URL not found!!')
        return url
    } catch {
        throw new Error('Sign in failed!')
    }
}

export const signOutService = async (headers : Headers) : Promise<boolean> => {
    try {
        const result = await auth.api.signOut({
            headers   
        })
        if(!result.success) throw new Error('Could Not Sign out')
        return result.success
    } catch (error) {
        throw new Error('Sign out failed!!')
    }
}