import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { News } from '@/models/news';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const { id } = params;
    await News.findByIdAndDelete(id);
    return NextResponse.json({ message: 'News item deleted successfully' });
  } catch  {
    return NextResponse.json({ error: 'Failed to delete news item' }, { status: 500 });
  }
}

