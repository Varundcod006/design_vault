import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { MainNav } from '@/components/main-nav';
import { ModeToggle } from '@/components/mode-toggle';
import { AuthCheck } from '@/components/auth-check';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
});

export const metadata: Metadata = {
  title: 'DesignVault - UI Inspiration & Color Palettes',
  description: 'Discover beautiful color palettes and UI design inspiration for your next project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthCheck>
            <div className="relative flex min-h-screen flex-col">
              <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-14 backdrop-blur-xl">
                <div className="container flex h-16 items-center w-full gap-4">
                  <MainNav />
                  <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <ModeToggle />
                  </div>
                </div>
              </header>
              <main className="flex-1">{children}</main>
            </div>
          </AuthCheck>
        </ThemeProvider>
      </body>
    </html>
  );
}