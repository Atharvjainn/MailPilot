import {prisma} from '../prisma'

export const getGoogleAccount = async (userId : string) => {
    try {
        const account = await prisma.account.findFirst({
            where : {
                userId : userId,
                providerId : 'google'
            }
        })
        if(!account?.accessToken) throw new Error('No Google Account Linked!!')
        return account
    } catch (error) {
        throw new Error("Something went wrong in fetching emails...");
        
    }
}