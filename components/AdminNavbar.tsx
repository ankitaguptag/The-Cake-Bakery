'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { RiCake3Fill } from 'react-icons/ri'

const navItems = [
  { name: 'Dashboard', path: '/admin' },
  { name: 'Home', path: '/admin/home' },
  { name: 'News', path: '/admin/news' },
  { name: 'About', path: '/admin/about' },
  { name: 'Favorites', path: '/admin/favorites' },
  { name: 'Cakes', path: '/admin/cakes' },
  { name: 'Footer', path: '/admin/footer' },
]

export default function AdminNavbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
             <a href="/" className="flex items-center text-3xl font-bold">
                                    <RiCake3Fill className="mr-2 text-4xl" /> {/* Cake icon */}
                                    The Cake Shop
                                </a>
            <Link href="/admin" className="text-xl font-semibold text-gray-800">
              (Admin Panel)            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium",
                    pathname === item.path
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button
                onClick={() => signOut({ callbackUrl: '/' })}
                variant="outline"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

