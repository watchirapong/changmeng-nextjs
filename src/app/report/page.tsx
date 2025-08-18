'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { LatLng } from 'leaflet';
import TrashLocationForm from '@/components/TrashLocationForm';

// Dynamically import the map component
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface TrashLocation {
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
  images?: string[];
}

export default function ReportPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setSelectedCoordinates(e.latlng);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: TrashLocation) => {
    setLoading(true);
    try {
      const response = await fetch('/api/trash', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          latitude: data.location.coordinates[1],
          longitude: data.location.coordinates[0],
        }),
      });

      if (response.ok) {
        alert('Trash location reported successfully!');
        setShowForm(false);
        setSelectedCoordinates(null);
        // Redirect to map page
        window.location.href = '/map';
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error reporting location:', error);
      alert('Error reporting location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedCoordinates(null);
  };

  // Default center (Bangkok, Thailand)
  const defaultCenter: [number, number] = [13.7563, 100.5018];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Report Trash Location</h1>
              <p className="text-gray-600">Help keep our community clean by reporting trash</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/map'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                View Map
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Home
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Select Location</h2>
                <div className="text-sm text-gray-600">
                  Click on the map to mark the trash location
                </div>
              </div>
              
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <MapContainer
                  center={userLocation || defaultCenter}
                  zoom={15}
                  style={{ height: '100%', width: '100%' }}
                  eventHandlers={{
                    click: handleMapClick,
                  }}
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

                  {/* Selected location marker */}
                  {selectedCoordinates && (
                    <CircleMarker
                      center={[selectedCoordinates.lat, selectedCoordinates.lng]}
                      radius={10}
                      fillColor="#ef4444"
                      color="#dc2626"
                      weight={2}
                      opacity={1}
                      fillOpacity={0.8}
                    >
                      <Popup>
                        <div className="text-center">
                          <strong>Selected Location</strong>
                          <br />
                          <span className="text-sm">
                            Lat: {selectedCoordinates.lat.toFixed(6)}
                            <br />
                            Lng: {selectedCoordinates.lng.toFixed(6)}
                          </span>
                        </div>
                      </Popup>
                    </CircleMarker>
                  )}
                </MapContainer>
              </div>
              
              {/* Instructions */}
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">How to Report</h3>
                <ol className="text-sm text-green-700 space-y-1">
                  <li>1. Click on the map to mark the exact location of the trash</li>
                  <li>2. Fill in the details in the form that appears</li>
                  <li>3. Provide accurate information about the trash type and severity</li>
                  <li>4. Submit your report to help keep our community clean</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {showForm ? (
              <TrashLocationForm
                selectedCoordinates={selectedCoordinates}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isEditing={false}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Trash</h3>
                <p className="text-gray-600 mb-4">
                  Click on the map to select the location where you found trash, then fill in the details in the form that appears.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-1">What to include:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Type of trash (plastic, paper, glass, etc.)</li>
                      <li>• Detailed description of the location</li>
                      <li>• Severity level (how urgent is cleanup)</li>
                      <li>• Your name or organization</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-1">Tips:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Be as specific as possible about the location</li>
                      <li>• Include any relevant details about the trash</li>
                      <li>• Set appropriate severity based on environmental impact</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span>Submitting report...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
