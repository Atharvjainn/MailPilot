'use client'

import { useAuthStore } from "@/store/useAuthStore"
import { useEffect, useRef } from "react"



export default function Providers({
    children,
} : {
    children : React.ReactNode
}){
    const { authuser, ischeckingauth, checkauth } = useAuthStore()
    const haschecked = useRef(false)

    useEffect(() => {
        if (!authuser && !ischeckingauth && !haschecked.current) {
            haschecked.current = true
            checkauth()
        }
    }, [authuser,ischeckingauth])


    return (
        <>
        {children}
        </>
    )
}