'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link'
import Image from 'next/image'

interface Cake {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export default function AllCakes() {
  const [cakes, setCakes] = useState<Cake[]>([])
  const [filteredCakes, setFilteredCakes] = useState<Cake[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const cakesPerPage = 9

  useEffect(() => {
    fetchCakes()
  }, [])

  useEffect(() => {
    filterCakes()
  }, [cakes, searchTerm, categoryFilter])

  const fetchCakes = async () => {
    try {
      const response = await fetch('/api/cakes')
      const data = await response.json()
      setCakes(data)
    } catch (error) {
      console.error('Error fetching cakes:', error)
    }
  }

  const filterCakes = () => {
    let filtered = cakes
    if (searchTerm) {
      filtered = filtered.filter(cake => 
        cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    if (categoryFilter) {
      filtered = filtered.filter(cake => cake.category === categoryFilter)
    }
    setFilteredCakes(filtered)
    setCurrentPage(1)
  }

  const indexOfLastCake = currentPage * cakesPerPage
  const indexOfFirstCake = indexOfLastCake - cakesPerPage
  const currentCakes = filteredCakes.slice(indexOfFirstCake, indexOfLastCake)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">All Cakes</h1>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <Input
          type="text"
          placeholder="Search cakes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 md:mb-0 md:mr-4 md:w-1/3"
        />
        <Select onValueChange={(value) => setCategoryFilter(value)}>
          <SelectTrigger className="w-full md:w-1/3">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="birthday">Birthday</SelectItem>
            <SelectItem value="wedding">Wedding</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCakes.map((cake) => (
          <Card key={cake.id}>
            <CardHeader>
              <CardTitle>{cake.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Image src={cake.image} alt={cake.name} width={300} height={200} className="w-full h-48 object-cover mb-4" />
              <p className="text-sm text-gray-600 mb-2">{cake.description.substring(0, 100)}...</p>
              <p className="font-bold">${cake.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter>
              <Link href={`/cakes/${cake.id}`}>
                <Button>View Details</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        {Array.from({ length: Math.ceil(filteredCakes.length / cakesPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="mx-1"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  )
}

