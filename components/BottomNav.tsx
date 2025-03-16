"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Palette, Share2, Moon, Sun, Layout } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ModeToggle } from "./mode-toggle";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function BottomNav() {
    const pathname = usePathname();
    // const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
      const { setTheme } = useTheme()
    

    useEffect(() => {
        setMounted(true);
    }, []);

    // // Function to toggle Dark Mode
    // const toggleDarkMode = () => {
    //     setTheme(theme === "dark" ? "light" : "dark");
    // };

    // Function to share the website link
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Check this out!",
                url: window.location.href,
            });
        } else {
            alert("Your browser doesn't support the Web Share API.");
        }
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-t md:hidden backdrop-blur-xl">
            <div className="container flex justify-around items-center h-16">
                <BottomNavItem href="/" icon={Home} label="Home" active={pathname === "/"} />
                <BottomNavItem href="/palettes" icon={Palette} label="Palettes" active={pathname === "/palettes"} />
                <BottomNavItem href="/inspiration" icon={Layout} label="Inspiration" active={pathname === "/inspiration"} />
                
                <div className={`flex flex-col items-center gap-0 transition-all duration-300`
                }>
                    {/* <ModeToggle /> */}
                    <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Sun className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                              <Moon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                              <span className="sr-only">Toggle theme</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme("light")}>
                              Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("dark")}>
                              Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme("system")}>
                              System
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    {/* <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-current"}`} /> */}
                    {/* <span style={{
                        margin: "0px",
                        fontSize: "14px",
                        opacity: ".5"
                    }} className="">Theme</span> */}
                </div>

                {/* Share Button
        <button
          onClick={handleShare}
          className="relative flex flex-col items-center gap-1 text-sm transition-all duration-300 text-muted-foreground hover:text-primary"
        >
          <Share2 className="h-5 w-5" />
          <span>Share</span>
        </button> */}

                {/* Dark Mode Toggle Button */}
                {/* <button
          onClick={toggleDarkMode}
          className="relative flex flex-col items-center gap-1 text-sm transition-all duration-300 text-muted-foreground hover:text-primary"
        >
          {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span>Theme</span>
        </button> */}
            </div>
        </nav>
    );
}

interface BottomNavItemProps {
    href: string;
    icon: React.ElementType;
    label: string;
    active: boolean;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({ href, icon: Icon, label, active }) => {
    return (
        <Link href={href} className="relative flex flex-col items-center gap-1 text-sm transition-all duration-300">
            <div className={`flex flex-col items-center gap-1 transition-all duration-300
        ${active ? "text-current border-b-2 border-primary" : "text-muted-foreground"}
        hover:text-primary`
            }>
                <Icon className={`h-5 w-wull ${active ? "text-primary mb-4" : "text-current"}`} />
                {/* <span className="pb-2">{label}</span> */}
            </div>

            {/* Spotlight Glow Effect */}
            {active && (
                <div className="absolute inset-x-0 -top-4 h-10 bg-primary/20 blur-lg rounded-full"></div>
            )}
        </Link>
    );
};
