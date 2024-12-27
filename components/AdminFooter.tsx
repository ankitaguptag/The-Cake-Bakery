'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface FooterData {
  companyName: string
  description: string
  email: string
  phone: string
  socialLinks: {
    facebook: string
    twitter: string
    instagram: string
  }
}

export default function AdminFooter() {
  const [footerData, setFooterData] = useState<FooterData>({
    companyName: '',
    description: '',
    email: '',
    phone: '',
    socialLinks: {
      facebook: '',
      twitter: '',
      instagram: '',
    },
  })
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchFooterData() {
      try {
        const res = await fetch('/api/footer')
        const data = await res.json()
        setFooterData(data)
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching footer data:', error)
        setIsLoading(false)
      }
    }
    fetchFooterData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFooterData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFooterData((prevData) => ({
      ...prevData,
      socialLinks: { ...prevData.socialLinks, [name]: value },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await fetch('/api/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footerData),
      })
      if (res.ok) {
        router.push('/admin')
      } else {
        throw new Error('Failed to update footer data')
      }
    } catch (error) {
      console.error('Error updating footer data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Footer Section</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            value={footerData?.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={footerData?.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={footerData?.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            value={footerData?.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="facebook">Facebook</Label>
          <Input
            id="facebook"
            name="facebook"
            value={footerData?.socialLinks?.facebook}
            onChange={handleSocialLinkChange}
          />
        </div>
        <div>
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            id="twitter"
            name="twitter"
            value={footerData?.socialLinks?.twitter}
            onChange={handleSocialLinkChange}
          />
        </div>
        <div>
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            id="instagram"
            name="instagram"
            value={footerData?.socialLinks?.instagram}
            onChange={handleSocialLinkChange}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Footer Section'}
        </Button>
      </form>
    </div>
  )
}

