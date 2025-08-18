import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TrashLocation from '@/models/TrashLocation';

// Get a specific trash location
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const trashLocation = await TrashLocation.findById(params.id);
    
    if (!trashLocation) {
      return NextResponse.json(
        { error: 'Trash location not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ trashLocation });
  } catch (error) {
    console.error('Error fetching trash location:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trash location' },
      { status: 500 }
    );
  }
}

// Update a trash location
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    
    const updatedLocation = await TrashLocation.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    );
    
    if (!updatedLocation) {
      return NextResponse.json(
        { error: 'Trash location not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ trashLocation: updatedLocation });
  } catch (error: any) {
    console.error('Error updating trash location:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update trash location' },
      { status: 500 }
    );
  }
}

// Delete a trash location
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const deletedLocation = await TrashLocation.findByIdAndDelete(params.id);
    
    if (!deletedLocation) {
      return NextResponse.json(
        { error: 'Trash location not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Trash location deleted successfully' });
  } catch (error) {
    console.error('Error deleting trash location:', error);
    return NextResponse.json(
      { error: 'Failed to delete trash location' },
      { status: 500 }
    );
  }
}
