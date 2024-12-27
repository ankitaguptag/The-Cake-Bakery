import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Favorite } from '@/models/favorite';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const { id } = params;
    await Favorite.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Favorite deleted successfully' });
  } catch  {
    return NextResponse.json({ error: 'Failed to delete favorite' }, { status: 500 });
  }
}

