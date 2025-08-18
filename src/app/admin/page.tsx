'use client';

import { useState } from 'react';
import AdminMap from '@/components/AdminMap';
import TrashLocationForm from '@/components/TrashLocationForm';
import { LatLng } from 'leaflet';

interface TrashLocation {
  _id?: string;
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

export default function AdminPage() {
  const [selectedCoordinates, setSelectedCoordinates] = useState<LatLng | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<TrashLocation | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNewLocation = (latlng: LatLng) => {
    setSelectedCoordinates(latlng);
    setSelectedLocation(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleLocationSelect = (location: TrashLocation) => {
    setSelectedLocation(location);
    setSelectedCoordinates(null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleFormSubmit = async (data: TrashLocation) => {
    setLoading(true);
    try {
      const url = isEditing ? `/api/trash/${selectedLocation?._id}` : '/api/trash';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
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
        setShowForm(false);
        setSelectedLocation(null);
        setSelectedCoordinates(null);
        setIsEditing(false);
        // Refresh the page to update the map
        window.location.reload();
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error saving location:', error);
      alert('Error saving location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setSelectedLocation(null);
    setSelectedCoordinates(null);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600">Manage trash locations and reports</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/map'}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
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
                <h2 className="text-xl font-semibold text-gray-800">Admin Map</h2>
                <div className="text-sm text-gray-600">
                  Click on the map to add new locations
                </div>
              </div>
              
              <AdminMap
                onLocationSelect={handleLocationSelect}
                onNewLocation={handleNewLocation}
              />
              
              {/* Instructions */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">Instructions</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Click anywhere on the map to add a new trash location</li>
                  <li>• Click on existing markers to edit or delete them</li>
                  <li>• Use the form on the right to fill in location details</li>
                  <li>• All changes are saved to the database</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            {showForm ? (
              <TrashLocationForm
                location={selectedLocation}
                selectedCoordinates={selectedCoordinates}
                onSubmit={handleFormSubmit}
                onCancel={handleFormCancel}
                isEditing={isEditing}
              />
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Location</h3>
                <p className="text-gray-600 mb-4">
                  Click on the map to select a location, then fill in the details in the form that appears.
                </p>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <h4 className="font-medium text-yellow-800 mb-1">Tips:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Be specific about the trash type</li>
                      <li>• Include detailed descriptions</li>
                      <li>• Set appropriate severity levels</li>
                      <li>• Provide accurate addresses when possible</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Admin Stats */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">0</div>
                  <div className="text-sm text-red-700">High Priority</div>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">0</div>
                  <div className="text-sm text-yellow-700">Medium Priority</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-green-700">Low Priority</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-blue-700">Total Locations</div>
                </div>
              </div>
            </div>

            {/* Loading Overlay */}
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span>Saving location...</span>
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
