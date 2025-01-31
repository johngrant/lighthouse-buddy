import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { headers } from 'next/headers';
import Link from 'next/link';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lighthouse Buddy - Global Performance Insights',
  description: 'Run Lighthouse from multiple locations to get valuable insights for your site across the world',
};

function shouldShowNav(pathname: string) {
  // If pathname is empty or undefined, default to showing nav
  if (!pathname) return true;
  
  // Show nav on auth pages (login, signup, forgot-password)
  if (pathname === '/login' || pathname === '/signup' || pathname === '/forgot-password') {
    return true;
  }
  
  // Hide nav on app and docs routes
  return !pathname.startsWith('/app/') && !pathname.startsWith('/docs');
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = (await headersList).get('x-pathname') ?? '';
  const showNav = shouldShowNav(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {showNav && (
            <header className="bg-white">
              <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                  <Link href="/" className="-m-1.5 p-1.5 cursor-pointer">
                    <span className="flex items-center gap-2">
                      <Image
                        src="/images/logo.svg"
                        alt="Lighthouse Buddy"
                        width={32}
                        height={32}
                      />
                      <span className="text-lg font-medium text-gray-600">Lighthouse Buddy</span>
                    </span>
                  </Link>
                </div>
                <div className="flex gap-x-12">
                  <Link href="/measure" className="text-sm font-medium text-gray-600 cursor-pointer">
                    Measure
                  </Link>
                  <Link href="/monitoring" className="text-sm font-medium text-gray-600 cursor-pointer">
                    Monitoring
                  </Link>
                  <Link href="/api" className="text-sm font-medium text-gray-600 cursor-pointer">
                    API
                  </Link>
                  <Link href="/pricing" className="text-sm font-medium text-gray-600 cursor-pointer">
                    Pricing
                  </Link>
                  <Link href="/docs" className="text-sm font-medium text-gray-600 cursor-pointer">
                    Docs
                  </Link>
                </div>
                <div className="flex lg:flex-1 lg:justify-end gap-4 items-center">
                  <Link href="/login" className="text-sm font-medium text-gray-600 cursor-pointer">
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                  >
                    Sign up
                  </Link>
                </div>
              </nav>
            </header>
          )}
          <div className="min-h-screen bg-white flex flex-col">
            <main className="flex-grow">
              {children}
            </main>
            {showNav && <Footer />}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
