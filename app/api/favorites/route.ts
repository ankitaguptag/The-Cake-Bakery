import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database
  const favorites = [
    {
      id: 1,
      name: "Chocolate Delight",
      description: "Rich chocolate cake with creamy chocolate frosting",
      image: "/cakes/chocolate-delight.jpg"
    },
    {
      id: 2,
      name: "Strawberry Bliss",
      description: "Light vanilla cake with fresh strawberry filling",
      image: "/cakes/strawberry-bliss.jpg"
    },
    {
      id: 3,
      name: "Lemon Zest",
      description: "Tangy lemon cake with lemon curd filling",
      image: "/cakes/lemon-zest.jpg"
    }
  ]

  return NextResponse.json(favorites)
}

