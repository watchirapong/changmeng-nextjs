'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLngExpression } from 'leaflet';

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });

interface TrashLocation {
  _id: string;
  name: string;
  description: string;
  location: {
    coordinates: [number, number];
  };
  address?: string;
  trashType: 'plastic' | 'paper' | 'glass' | 'metal' | 'organic' | 'electronic' | 'other';
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'cleaned' | 'reported';
  reportedBy: string;
  reportedAt: string;
  createdAt: string;
}

interface TrashMapProps {
  userLocation?: [number, number];
  onLocationSelect?: (location: TrashLocation) => void;
}

const getTrashTypeColor = (type: string) => {
  switch (type) {
    case 'plastic': return '#ff6b6b';
    case 'paper': return '#4ecdc4';
    case 'glass': return '#45b7d1';
    case 'metal': return '#96ceb4';
    case 'organic': return '#feca57';
    case 'electronic': return '#ff9ff3';
    default: return '#a8e6cf';
  }
};

const getSeverityRadius = (severity: string) => {
  switch (severity) {
    case 'high': return 15;
    case 'medium': return 10;
    case 'low': return 6;
    default: return 8;
  }
};

export default function TrashMap({ userLocation, onLocationSelect }: TrashMapProps) {
  const [trashLocations, setTrashLocations] = useState<TrashLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Default center (Bangkok, Thailand)
  const defaultCenter: LatLngExpression = [13.7563, 100.5018];

  useEffect(() => {
    fetchTrashLocations();
  }, []);

  const fetchTrashLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/trash');
      const data = await response.json();
      
      if (data.trashLocations) {
        setTrashLocations(data.trashLocations);
      }
    } catch (error) {
      console.error('Error fetching trash locations:', error);
      setError('Failed to load trash locations');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkerClick = (location: TrashLocation) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-lg">Loading map...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-100 rounded-lg">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
      <MapContainer
        center={userLocation || defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* User location marker */}
        {userLocation && (
          <CircleMarker
            center={userLocation}
            radius={8}
            fillColor="#3b82f6"
            color="#1d4ed8"
            weight={2}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <div className="text-center">
                <strong>Your Location</strong>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* Trash location markers */}
        {trashLocations.map((location) => (
          <CircleMarker
            key={location._id}
            center={[location.location.coordinates[1], location.location.coordinates[0]]}
            radius={getSeverityRadius(location.severity)}
            fillColor={getTrashTypeColor(location.trashType)}
            color="#ffffff"
            weight={2}
            opacity={1}
            fillOpacity={0.7}
            eventHandlers={{
              click: () => handleMarkerClick(location),
            }}
          >
            <Popup>
              <div className="min-w-[200px]">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="font-medium">Type:</span>
                    <span className="capitalize">{location.trashType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Severity:</span>
                    <span className="capitalize">{location.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span className="capitalize">{location.status}</span>
                  </div>
                  {location.address && (
                    <div className="flex justify-between">
                      <span className="font-medium">Address:</span>
                      <span className="text-right">{location.address}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="font-medium">Reported by:</span>
                    <span>{location.reportedBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{new Date(location.reportedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
