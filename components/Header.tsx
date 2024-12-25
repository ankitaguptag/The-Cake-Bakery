'use client'

import { useState } from 'react'
import Link from 'next/link'
//import Image from 'next/image'
import { RiCake3Fill } from "react-icons/ri";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#FF9494]">
          {/* <RiCake3Fill className="mr-1 text-4xl " /> Cake icon */}
            {/* <Image src="/logo.png" alt="Cake-Bakery Shop Logo" width={50} height={50} className="rounded-full" /> */}
            {/* <span className="ml-3 text-2xl font-semibold">The Cake Shop</span> */}
            <a href="#" className="flex items-center text-3xl font-bold">
                        <RiCake3Fill className="mr-2 text-4xl" /> {/* Cake icon */}
                        The Cake Shop
                    </a>
          </div>
          <div className="hidden md:flex space-x-6">
            {['Home', 'News', 'About', 'Favorites', 'Location'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-[#4A4A4A] hover:text-[#FF9494] transition duration-300">
                {item}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-[#FF9494]">
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="mt-4 md:hidden space-y-2 animate-fadeIn">
            {['Home', 'News', 'About', 'Favorites', 'Location'].map((item) => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="block py-2 text-[#4A4A4A] hover:text-[#FF9494] transition duration-300">
                {item}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

