import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Home } from '@/models/home';

export async function GET() {
  try {
    await clientPromise;
    const home = await Home.findOne({});
    return NextResponse.json(home);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch home data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await clientPromise;
    const data = await request.json();
    const home = await Home.findOneAndUpdate({}, data, { upsert: true, new: true });
    return NextResponse.json(home);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update home data' }, { status: 500 });
  }
}

