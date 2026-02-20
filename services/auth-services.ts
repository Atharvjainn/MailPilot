import { auth } from "@/lib/auth"

export const signinSocialService = async(provider : 'google') : Promise<string> => {
    try {
        const { url } = await auth.api.signInSocial({
        body : {
            provider,callbackURL : '/dashboard'
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
    } catch  {
        throw new Error('Sign out failed!!')
    }
}

export const getsessionService = async (headers : Headers) => {
    try {
        const session = await auth.api.getSession({
            headers
        })
        if(!session) throw new Error('Unauthenticated!!')
        return session.user
    } catch {
        throw new Error('Could not find session')
    }
}