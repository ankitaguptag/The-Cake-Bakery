"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loader from './Loader'

interface AboutData {
  title: string
  description: string[]
  imageUrl: string
  founderName: string
  foundedYear: number
}

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    async function fetchAboutData() {
      try {
        const res = await fetch('/api/about')
        const data = await res.json()
        setAboutData(data)
      } catch (error) {
        console.error('Error fetching about data:', error)
      }
    }
    fetchAboutData()
  }, [])

  if (!aboutData) {
    return <div><Loader/></div>
  }

  return (
    <section id="about" className="py-16 bg-[#FFD1D1]">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{aboutData.title || 'Our Story'}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src={aboutData.imageUrl || "/bakery-image.jpg"}
              alt="Our bakery"
              width={500}
              height={300}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4">
            {aboutData.description.map((paragraph, index) => (
              <p key={index} className="text-lg">{paragraph}</p>
            ))}
            <p className="text-lg">
              Founded by {aboutData.founderName} in {aboutData.foundedYear}.
            </p>
            <button className="btn-primary mt-4">Learn More</button>
          </div>
        </div>
      </div>
    </section>
  )
}

