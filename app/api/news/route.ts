import { NextResponse } from 'next/server'

export async function GET() {
  // In a real application, this data would come from a database
  const news = [
    {
      id: 1,
      title: "New Summer Flavors",
      date: "2023-06-01",
      description: "Try our new refreshing lemon and strawberry cakes, perfect for summer!"
    },
    {
      id: 2,
      title: "Cake Decorating Workshop",
      date: "2023-06-15",
      description: "Join us for a hands-on cake decorating workshop this weekend."
    },
    {
      id: 3,
      title: "Father's Day Special",
      date: "2023-06-10",
      description: "Order our special Father's Day cake and get a 10% discount!"
    }
  ]

  return NextResponse.json(news)
}

