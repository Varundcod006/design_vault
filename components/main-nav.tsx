"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, Layout, Home } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();

  return (
    <div className="flex">
      <nav className="flex items-center space-x-6 text-sm font-medium">
        <NavItem href="/" icon={Home} label="Home" active={pathname === "/"} />
        <NavItem
          href="/palettes"
          icon={Palette}
          label="Palettes"
          active={pathname === "/palettes"}
        />
        <NavItem
          href="/inspiration"
          icon={Layout}
          label="Inspiration"
          active={pathname === "/inspiration"}
        />
      </nav>
    </div>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, active }) => {
  return (
    <Link href={href} className="relative">
      <div
        className={`relative flex items-center gap-x-2 px-3 py-4 transition-all duration-300
          ${active ? "text-white border-t-2 border-primary" : "text-foreground"} 
          hover:text-primary`}
      >
        {/* Icon */}
        <Icon className="h-4 w-4" />

        {/* Label */}
        <span>{label}</span>

        {/* Spotlight Glow Effect */}
        {active && (
          <div className="absolute inset-x-0 -top-5 h-12 bg-primary/20 blur-lg rounded-full"></div>
        )}
      </div>
    </Link>
  );
};

