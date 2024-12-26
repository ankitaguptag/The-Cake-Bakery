'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AboutData {
  title: string
  description: string[]
  imageUrl: string
  founderName: string
  foundedYear: number
}

export default function AdminAbout() {
  const [aboutData, setAboutData] = useState<AboutData>({
    title: '',
    description: [''],
    imageUrl: '',
    founderName: '',
    foundedYear: new Date().getFullYear(),
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch('/api/about')
        const data = await res.json()
        setAboutData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching about data:', error)
        setIsLoading(false)
      }
    }
    fetchAboutData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAboutData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleDescriptionChange = (index: number, value: string) => {
    setAboutData((prevData) => {
      const newDescription = [...prevData.description]
      newDescription[index] = value
      return { ...prevData, description: newDescription }
    })
  }

  const handleAddDescription = () => {
    setAboutData((prevData) => ({
      ...prevData,
      description: [...prevData.description, '']
    }))
  }

  const handleRemoveDescription = (index: number) => {
    setAboutData((prevData) => ({
      ...prevData,
      description: prevData.description.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        throw new Error('Failed to update about data')
      }
    } catch (error) {
      console.error('Error updating about data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage About Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={aboutData?.title}
            onChange={handleInputChange}
            required
          />
        </div>
        {aboutData?.description?.map((desc, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className="flex-grow">
              <Label htmlFor={`description-${index}`}>Description {index + 1}</Label>
              <Textarea
                id={`description-${index}`}
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                required
              />
            </div>
            <Button type="button" variant="destructive" onClick={() => handleRemoveDescription(index)}>
              Remove
            </Button>
          </div>
        ))}
        <Button type="button" onClick={handleAddDescription}>
          Add Description
        </Button>
        <div>
          <Label htmlFor="imageUrl">Image URL</Label>
          <Input
            id="imageUrl"
            name="imageUrl"
            value={aboutData?.imageUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="founderName">Founder Name</Label>
          <Input
            id="founderName"
            name="founderName"
            value={aboutData?.founderName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="foundedYear">Founded Year</Label>
          <Input
            id="foundedYear"
            name="foundedYear"
            type="number"
            value={aboutData?.foundedYear}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update About Section'}
        </Button>
      </form>
    </div>
  )
}

