'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface Cake {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function AdminCakes() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [newCake, setNewCake] = useState<Omit<Cake, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image: '',
    category: '',
  })

  useEffect(() => {
    fetchCakes()
  }, [])

  const fetchCakes = async () => {
    try {
      const response = await fetch('/api/cakes')
      const data = await response.json()
      setCakes(data)
    } catch (error) {
      console.error('Error fetching cakes:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewCake(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }))
  }

  const handleCategoryChange = (value: string) => {
    setNewCake(prev => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/cakes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCake),
      })
      if (response.ok) {
        fetchCakes()
        setNewCake({
          name: '',
          description: '',
          price: 0,
          image: '',
          category: '',
        })
      }
    } catch (error) {
      console.error('Error adding cake:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/cakes/${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        fetchCakes()
      }
    } catch (error) {
      console.error('Error deleting cake:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Cakes</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <Input
          name="name"
          value={newCake.name}
          onChange={handleInputChange}
          placeholder="Cake Name"
          required
        />
        <Textarea
          name="description"
          value={newCake.description}
          onChange={handleInputChange}
          placeholder="Cake Description"
          required
        />
        <Input
          name="price"
          type="number"
          value={newCake.price}
          onChange={handleInputChange}
          placeholder="Price"
          step="0.01"
          required
        />
        <Input
          name="image"
          value={newCake.image}
          onChange={handleInputChange}
          placeholder="Image URL"
          required
        />
        <Select onValueChange={handleCategoryChange} value={newCake.category}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="birthday">Birthday</SelectItem>
            <SelectItem value="wedding">Wedding</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Add Cake</Button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cakes.map((cake) => (
          <Card key={cake.id}>
            <CardHeader>
              <CardTitle>{cake.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <img src={cake.image} alt={cake.name} className="w-full h-48 object-cover mb-4" />
              <p className="text-sm text-gray-600 mb-2">{cake.description.substring(0, 100)}...</p>
              <p className="font-bold">${cake.price.toFixed(2)}</p>
              <p className="text-sm text-gray-500">Category: {cake.category}</p>
            </CardContent>
            <CardFooter>
              <Button variant="destructive" onClick={() => handleDelete(cake.id)}>Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

