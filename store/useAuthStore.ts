import { getUserAction } from '@/lib/actions/auth-actions'
import { User } from 'better-auth'
import {create} from 'zustand'


type AuthStore = {
    authuser : null | User,
    ischeckingauth : boolean,
    checkauth : () => void,
}



export const useAuthStore = create<AuthStore>((set,get) => ({
    authuser : null,
    ischeckingauth : false,
    checkauth : async() => {
        set({ischeckingauth : true})
        try {
            const user = await getUserAction();
            set({authuser : user})
        } catch (error) {
            console.log(error)
        } finally {
            set({ischeckingauth : false})
        }
    }

}))