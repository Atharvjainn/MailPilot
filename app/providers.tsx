'use client'

import { useAuthStore } from "@/store/useAuthStore"
import { useEffect } from "react"

export default function Providers({
    children,
} : {
    children : React.ReactNode
}){
    const {authuser,ischeckingauth,checkauth} = useAuthStore()

    useEffect(() => {
        if(!authuser && !ischeckingauth){
            checkauth()
        } 
    },[ischeckingauth])


    return (
        <>
        {children}
        </>
    )


}