'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Cake {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function CakeDetails({ id }: { id: string }) {
  const [cake, setCake] = useState<Cake | null>(null)

  useEffect(() => {
    fetchCake()
  }, [id])

  const fetchCake = async () => {
    try {
      const response = await fetch(`/api/cakes/${id}`)
      const data = await response.json()
      setCake(data)
    } catch (error) {
      console.error('Error fetching cake details:', error)
    }
  }

  if (!cake) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-6 md:mb-0">
          <Image src={cake.image} alt={cake.name} width={500} height={400} className="w-full h-auto object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">{cake.name}</h1>
          <p className="text-gray-600 mb-4">{cake.description}</p>
          <p className="text-2xl font-bold mb-4">${cake.price}</p>
          {/* <p className="text-2xl font-bold mb-4">${cake.price.toFixed(2)}</p> */}
          <p className="text-sm text-gray-500 mb-4">Category: {cake.category}</p>
          <Button>Add to Cart</Button>
        </div>
      </div>
    </div>
  )
}

