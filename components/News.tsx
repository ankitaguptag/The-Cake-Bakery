"use client"
import { useState, useEffect } from 'react'

interface NewsItem {
  id: number
  title: string
  date: string
  description: string
}

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])

  useEffect(() => {
    async function fetchNews() {
      const res = await fetch('/api/news')
      const data = await res.json()
      setNews(data)
    }
    fetchNews()
  }, [])

  return (
    <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Latest News</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="card p-6 animate-fadeIn">
              <h3 className="text-xl font-semibold mb-2 text-[var(--primary)]">{item.title}</h3>
              <p className="text-gray-600 mb-4">{item.date}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

