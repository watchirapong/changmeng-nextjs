'use client';

import { useState, useEffect } from 'react';
import TrashMap from '@/components/TrashMap';
import { LatLng } from 'leaflet';

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

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<TrashLocation | null>(null);
  const [showLocationDetails, setShowLocationDetails] = useState(false);

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

  const handleLocationSelect = (location: TrashLocation) => {
    setSelectedLocation(location);
    setShowLocationDetails(true);
  };

  const getTrashTypeIcon = (type: string) => {
    switch (type) {
      case 'plastic': return '🥤';
      case 'paper': return '📄';
      case 'glass': return '🍾';
      case 'metal': return '🥫';
      case 'organic': return '🍃';
      case 'electronic': return '📱';
      default: return '🗑️';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Find Trash Nearby</h1>
              <p className="text-gray-600">Locate and report trash in your area</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => window.location.href = '/admin'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Admin Panel
              </button>
              <button
                onClick={() => window.location.href = '/report'}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Report Trash
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
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Trash Map</h2>
              <TrashMap
                userLocation={userLocation || undefined}
                onLocationSelect={handleLocationSelect}
              />
              
              {/* Legend */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-800 mb-2">Legend</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span>High Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span>Medium Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Low Severity</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span>Your Location</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Location */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Location</h3>
              {userLocation ? (
                <div className="text-sm text-gray-600">
                  <p>Latitude: {userLocation[0].toFixed(6)}</p>
                  <p>Longitude: {userLocation[1].toFixed(6)}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Getting your location...</p>
              )}
            </div>

            {/* Selected Location Details */}
            {showLocationDetails && selectedLocation && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Location Details</h3>
                  <button
                    onClick={() => setShowLocationDetails(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getTrashTypeIcon(selectedLocation.trashType)}</span>
                    <div>
                      <h4 className="font-medium text-gray-800">{selectedLocation.name}</h4>
                      <p className="text-sm text-gray-600 capitalize">{selectedLocation.trashType}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700">{selectedLocation.description}</p>
                  
                  {selectedLocation.address && (
                    <div>
                      <span className="text-sm font-medium text-gray-600">Address:</span>
                      <p className="text-sm text-gray-700">{selectedLocation.address}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Severity:</span>
                    <span className={`text-sm font-medium ${getSeverityColor(selectedLocation.severity)}`}>
                      {selectedLocation.severity.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <span className="text-sm text-gray-700 capitalize">{selectedLocation.status}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Reported by:</span>
                    <span className="text-sm text-gray-700">{selectedLocation.reportedBy}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Date:</span>
                    <span className="text-sm text-gray-700">
                      {new Date(selectedLocation.reportedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.location.href = '/report'}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Report New Trash
                </button>
                <button
                  onClick={() => window.location.href = '/admin'}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Admin Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
