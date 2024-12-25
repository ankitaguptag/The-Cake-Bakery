"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Cake {
  id: number
  name: string
  description: string
  image: string
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Cake[]>([])

  useEffect(() => {
    async function fetchFavorites() {
      const res = await fetch('/api/favorites')
      const data = await res.json()
      setFavorites(data)
    }
    fetchFavorites()
  }, [])

  return (
    <section id="favorites" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((cake) => (
            <div key={cake.id} className="card animate-fadeIn">
              <Image
                src={cake.image}
                alt={cake.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#FF9494]">{cake.name}</h3>
                <p className="text-gray-600 mb-4">{cake.description}</p>
                <div className="flex justify-between items-center">
                  <button className="btn-primary">
                    Add to Cart
                  </button>
                  <button className="text-[#FF9494] hover:text-[#FFD1D1] transition duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

