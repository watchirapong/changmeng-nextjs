import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TrashLocation from '@/models/TrashLocation';

// Get all trash locations with optional filtering
export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const trashType = searchParams.get('trashType');
    const severity = searchParams.get('severity');
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '10000'; // Default 10km radius

    let query: any = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by trash type
    if (trashType) {
      query.trashType = trashType;
    }

    // Filter by severity
    if (severity) {
      query.severity = severity;
    }

    let trashLocations;

    // If coordinates provided, find nearby locations
    if (lat && lng) {
      trashLocations = await TrashLocation.find({
        ...query,
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: parseInt(radius),
          },
        },
      }).sort({ createdAt: -1 });
    } else {
      // Get all locations with filters
      trashLocations = await TrashLocation.find(query).sort({ createdAt: -1 });
    }

    return NextResponse.json({ trashLocations });
  } catch (error) {
    console.error('Error fetching trash locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch trash locations' },
      { status: 500 }
    );
  }
}

// Create a new trash location
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    
    const {
      name,
      description,
      latitude,
      longitude,
      address,
      trashType,
      severity,
      reportedBy,
      images = [],
    } = body;
    
    if (!name || !description || !latitude || !longitude || !trashType || !reportedBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trashLocation = new TrashLocation({
      name,
      description,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      address,
      trashType,
      severity: severity || 'medium',
      reportedBy,
      images,
    });

    const savedLocation = await trashLocation.save();
    return NextResponse.json({ trashLocation: savedLocation }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating trash location:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create trash location' },
      { status: 500 }
    );
  }
}
