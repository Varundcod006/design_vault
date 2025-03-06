"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { auth } from "@/lib/appwrite"

const protectedPaths = ["/create/palette", "/create/inspiration"]

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await auth.getCurrentUser()
        
        // If user is not authenticated and trying to access protected route
        if (!session && protectedPaths.includes(pathname)) {
          router.push("/login")
        }
      } catch (error) {
        // If there's an error (no session) and trying to access protected route
        if (protectedPaths.includes(pathname)) {
          router.push("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
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