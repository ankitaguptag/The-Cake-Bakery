import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Cake } from '@/models/cake';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const cake = await Cake.findById(params.id);
    if (!cake) {
      return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
    }
    return NextResponse.json(cake);
  } catch  {
    return NextResponse.json({ error: 'Failed to fetch cake' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const data = await request.json();
    const cake = await Cake.findByIdAndUpdate(params.id, data, { new: true });
    if (!cake) {
      return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
    }
    return NextResponse.json(cake);
  } catch  {
    return NextResponse.json({ error: 'Failed to update cake' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const cake = await Cake.findByIdAndDelete(params.id);
    if (!cake) {
      return NextResponse.json({ error: 'Cake not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Cake deleted successfully' });
  } catch  {
    return NextResponse.json({ error: 'Failed to delete cake' }, { status: 500 });
  }
}

