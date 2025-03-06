"use client"

import * as React from "react"
import Link from "next/link"
import { Palette, Layout, Home } from "lucide-react"
// import Logo from '.././public/Logo/Logo.png'

export function MainNav() {
  return (
    <div className="mr-4 flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        {/* <Palette className="h-6 w-6" /> */}
        <img src="https://cloud.appwrite.io/v1/storage/buckets/67b3f86900370ab5c073/files/67c9138e00368541c13d/view?project=67b0397b000fa8add446&mode=admin" alt="Logo" className="h-8 w-8" />
        
        <span className="hidden font-bold sm:inline-block">
          RP Jadeja
        </span>
      </Link>
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