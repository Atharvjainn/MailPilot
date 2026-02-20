import {betterAuth} from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from './prisma'
import  { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
    database : prismaAdapter(prisma,{provider : 'postgresql'}),
    socialProviders : {
        google : {
            clientId : process.env.GOOGLE_CLIENT_ID as string,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET as string,
            scope : [
                'openid','email','profile','https://www.googleapis.com/auth/gmail.readonly'
            ],
            accessType : 'offline',
            prompt : 'consent'
        }
    },
    plugins : [nextCookies()]
})

