'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LogoutPage() {
    const router = useRouter();
    useEffect(()=>{
        const supabase = createClient();
        supabase.auth.signOut().then(()=>{
            router.push('/');
        });
    },[])

    return (
        <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center items-center gap-2 center">
                <h1>Processing</h1>
            </div>
        </main>
    )
}