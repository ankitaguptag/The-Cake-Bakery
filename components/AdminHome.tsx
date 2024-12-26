'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface HomeData {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  buttonText: string
  buttonLink: string
}

export default function AdminHome() {
  const [homeData, setHomeData] = useState<HomeData>({
    heroTitle: '',
    heroSubtitle: '',
    heroImage: '',
    buttonText: '',
    buttonLink: '',
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch('/api/home')
        const data = await res.json()
        setHomeData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching home data:', error)
        setIsLoading(false)
      }
    }
    fetchHomeData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setHomeData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/home', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(homeData),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        throw new Error('Failed to update home data')
      }
    } catch (error) {
      console.error('Error updating home data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Home Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="heroTitle">Hero Title</Label>
          <Input
            id="heroTitle"
            name="heroTitle"
            value={homeData?.heroTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
          <Textarea
            id="heroSubtitle"
            name="heroSubtitle"
            value={homeData?.heroSubtitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="heroImage">Hero Image URL</Label>
          <Input
            id="heroImage"
            name="heroImage"
            value={homeData?.heroImage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="buttonText">Button Text</Label>
          <Input
            id="buttonText"
            name="buttonText"
            value={homeData?.buttonText}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="buttonLink">Button Link</Label>
          <Input
            id="buttonLink"
            name="buttonLink"
            value={homeData?.buttonLink}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Home Section'}
        </Button>
      </form>
    </div>
  )
}

