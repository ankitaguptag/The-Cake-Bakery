import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Favorite } from '@/models/favorite';

export async function GET() {
  try {
    await clientPromise;
    const favorites = await Favorite.find({});
    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch favorites' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await clientPromise;
    const data = await request.json();
    const favorite = await Favorite.create(data);
    return NextResponse.json(favorite);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create favorite' }, { status: 500 });
  }
}

