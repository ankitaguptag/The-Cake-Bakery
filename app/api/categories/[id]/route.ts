import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Category } from '@/models/category';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await clientPromise;
    const category = await Category.findByIdAndDelete(params.id);
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete category' }, { status: 500 });
  }
}

