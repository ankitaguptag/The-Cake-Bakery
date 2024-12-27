import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Category } from '@/models/category';

export async function GET() {
  try {
    await clientPromise;
    const categories = await Category.find({});
    return NextResponse.json(categories);
  } catch  {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await clientPromise;
    const data = await request.json();
    const category = await Category.create(data);
    return NextResponse.json(category);
  } catch  {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}

