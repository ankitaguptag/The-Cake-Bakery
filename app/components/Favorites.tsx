"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Cake {
  _id: string
  name: string
  description: string
  image: string
  price: number
  isAvailable: boolean
}

export default function Favorites() {
  const [favorites, setFavorites] = useState<Cake[]>([])

  useEffect(() => {
    async function fetchFavorites() {
      try {
        const res = await fetch('/api/favorites')
        const data = await res.json()
        setFavorites(data)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      }
    }
    fetchFavorites()
  }, [])

  return (
    <section id="favorites" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Favorites</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((cake) => (
            <div key={cake._id} className="card animate-fadeIn">
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
                  <div>
                    <span className="font-bold text-[#FF9494]">${cake.price}</span>
                    {!cake.isAvailable && (
                      <span className="ml-2 text-red-500">(Out of Stock)</span>
                    )}
                  </div>
                  <button 
                    className="btn-primary"
                    disabled={!cake.isAvailable}
                  >
                    Add to Cart
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

