"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RiCake3Fill } from "react-icons/ri";

const navItems = [
  { name: "Dashboard", path: "/admin" },
  { name: "Home", path: "/admin/home" },
  { name: "News", path: "/admin/news" },
  { name: "About", path: "/admin/about" },
  { name: "Favorites", path: "/admin/favorites" },
  { name: "Cakes", path: "/admin/cakes" },
  { name: 'Categories', path: '/admin/categories' },
  { name: "Footer", path: "/admin/footer" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center text-[#FF9494]">
            <a href="/" className="flex items-center text-3xl font-bold">
              <RiCake3Fill className="mr-2 text-4xl" /> {/* Cake icon */}
              The Cake Shop
            </a>
            <Link href="/admin" className="text-2xl font-bold ">
              (Admin Panel)
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium",
                  pathname === item.path
                    ? "bg-[#FF9494] text-white"
                    : "text-gray-600 hover:bg-[#FFD1D1] hover:text-gray-900"
                )}
              >
                {item.name}
              </Link>
            ))}
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="outline"
              className="ml-4"
            >
              Sign Out
            </Button>
          </div>
          <div className="md:hidden">
            {/* Add a mobile menu button here if needed */}
          </div>
        </div>
      </nav>
    </header>
  );
}
