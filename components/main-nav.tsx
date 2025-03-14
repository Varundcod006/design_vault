"use client"

import * as React from "react"
import Link from "next/link"
import { Palette, Layout, Home } from "lucide-react"
// import Logo from '.././public/Logo/Logo.png'

export function MainNav() {
  return (
    <div className="flex">
      
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <Link
          href="/"
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          <div className="flex items-center gap-x-2">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </div>
        </Link>
        <Link
          href="/palettes"
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          <div className="flex items-center gap-x-2">
            <Palette className="h-4 w-4" />
            <span>Palettes</span>
          </div>
        </Link>
        <Link
          href="/inspiration"
          className="transition-colors hover:text-foreground/80 text-foreground"
        >
          <div className="flex items-center gap-x-2">
            <Layout className="h-4 w-4" />
            <span>Inspiration</span>
          </div>
        </Link>
      </nav>
    </div>
  )
}