"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Client, Account } from "appwrite"

const publicPaths = ["/login", "/signup"]

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("67b0397b000fa8add446")
    const account = new Account(client)

    const checkAuth = async () => {
      try {

        const session = await account.createAnonymousSession()

        // If user is not authenticated and trying to access protected route
        if (!session && !publicPaths.includes(pathname)) {
          router.push("/login")
        }
        // If user is authenticated and trying to access auth routes
        else if (session && publicPaths.includes(pathname)) {
          router.push("/")
        }
      } catch (error) {
        // If there's an error (no session) and trying to access protected route
        if (!publicPaths.includes(pathname)) {
          router.push("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // Listen for auth state changes
    const unsubscribe = client.subscribe('account', (response) => {
      if (response.events.includes('user.delete') || response.events.includes('session.delete')) {
        router.push('/login')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [pathname, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}