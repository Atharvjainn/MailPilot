import { triggerEmailSync } from "@/lib/actions/email-actions"
import { create } from "zustand"


type EmailStore = {
    syncEmails : () => void,
    issyncing : boolean,
}

export const useEmailStore = create<EmailStore>((set,get) => ({
    issyncing : false,
    syncEmails : async() => {
        set({issyncing : true})
        try {
             const response = await triggerEmailSync()
        } catch (error) {
            console.log('something went wrong in the store',error)
        } finally{
            set({issyncing : false})
        }
    },
    getEmails : () => {

    }
}))