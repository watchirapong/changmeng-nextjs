'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { LatLngExpression, LatLng } from 'leaflet';

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

interface AdminMapProps {
  onLocationSelect?: (location: TrashLocation) => void;
  onNewLocation?: (latlng: LatLng) => void;
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

export default function AdminMap({ onLocationSelect, onNewLocation }: AdminMapProps) {
  const [trashLocations, setTrashLocations] = useState<TrashLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

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

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setSelectedLocation(e.latlng);
    
    if (onNewLocation) {
      onNewLocation(e.latlng);
    }
  };

  const handleMarkerClick = (location: TrashLocation) => {
    if (onLocationSelect) {
      onLocationSelect(location);
    }
  };

  const handleDeleteLocation = async (locationId: string) => {
    try {
      const response = await fetch(`/api/trash/${locationId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTrashLocations(prev => prev.filter(loc => loc._id !== locationId));
      } else {
        console.error('Failed to delete location');
      }
    } catch (error) {
      console.error('Error deleting location:', error);
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
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        eventHandlers={{
          click: handleMapClick,
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Selected location marker (for new locations) */}
        {selectedLocation && (
          <CircleMarker
            center={[selectedLocation.lat, selectedLocation.lng]}
            radius={8}
            fillColor="#ef4444"
            color="#dc2626"
            weight={2}
            opacity={1}
            fillOpacity={0.8}
          >
            <Popup>
              <div className="text-center">
                <strong>New Location Selected</strong>
                <br />
                <span className="text-sm">
                  Lat: {selectedLocation.lat.toFixed(6)}
                  <br />
                  Lng: {selectedLocation.lng.toFixed(6)}
                </span>
              </div>
            </Popup>
          </CircleMarker>
        )}

        {/* Existing trash location markers */}
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
              <div className="min-w-[250px]">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                <div className="space-y-1 text-xs mb-3">
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
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDeleteLocation(location._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => onLocationSelect?.(location)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs transition-colors"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
