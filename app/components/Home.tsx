"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Loader from './Loader'

interface HomeData {
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  buttonText: string
  buttonLink: string
}

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null)

  useEffect(() => {
    async function fetchHomeData() {
      try {
        const res = await fetch('/api/home')
        const data = await res.json()
        setHomeData(data)
      } catch (error) {
        console.error('Error fetching home data:', error)
      }
    }
    fetchHomeData()
  }, [])

  if (!homeData) {
    return <div> <Loader /></div>
  }

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <Image
        src={homeData.heroImage || "/hero-image.jpg"}
        alt="Delicious cakes"
        layout="fill"
        objectFit="cover"
        quality={100}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="relative z-10 text-center text-white space-y-6 animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-bold mb-4">{homeData.heroTitle}</h1>
        <p className="text-xl md:text-2xl mb-8">{homeData.heroSubtitle}</p>
        <a href={homeData.buttonLink}>
          <button className="btn-primary text-lg">
            {homeData.buttonText}
          </button>
        </a>
      </div>
    </section>
  )
}

