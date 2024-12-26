import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { News } from '@/models/news';

export async function GET() {
  try {
    await clientPromise;
    const news = await News.find({}).sort({ date: -1 });
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await clientPromise;
    const data = await request.json();
    const newsItem = await News.create(data);
    return NextResponse.json(newsItem);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

