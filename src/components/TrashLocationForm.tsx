'use client';

import { useState, useEffect } from 'react';
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

interface TrashLocationFormProps {
  location?: TrashLocation | null;
  selectedCoordinates?: LatLng | null;
  onSubmit: (data: TrashLocation) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

export default function TrashLocationForm({
  location,
  selectedCoordinates,
  onSubmit,
  onCancel,
  isEditing = false,
}: TrashLocationFormProps) {
  const [formData, setFormData] = useState<TrashLocation>({
    name: '',
    description: '',
    location: { coordinates: [0, 0] },
    address: '',
    trashType: 'plastic',
    severity: 'medium',
    status: 'active',
    reportedBy: '',
    images: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (location) {
      setFormData(location);
    }
  }, [location]);

  useEffect(() => {
    if (selectedCoordinates) {
      setFormData(prev => ({
        ...prev,
        location: {
          coordinates: [selectedCoordinates.lng, selectedCoordinates.lat],
        },
      }));
    }
  }, [selectedCoordinates]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.reportedBy.trim()) {
      newErrors.reportedBy = 'Reporter name is required';
    }

    if (formData.location.coordinates[0] === 0 && formData.location.coordinates[1] === 0) {
      newErrors.location = 'Please select a location on the map';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {isEditing ? 'Edit Trash Location' : 'Add New Trash Location'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="e.g., Plastic waste near park"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe the trash location..."
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            type="text"
            value={formData.address || ''}
            onChange={(e) => handleInputChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Street address (optional)"
          />
        </div>

        {/* Trash Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trash Type *
          </label>
          <select
            value={formData.trashType}
            onChange={(e) => handleInputChange('trashType', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="plastic">Plastic</option>
            <option value="paper">Paper</option>
            <option value="glass">Glass</option>
            <option value="metal">Metal</option>
            <option value="organic">Organic</option>
            <option value="electronic">Electronic</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Severity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Severity *
          </label>
          <select
            value={formData.severity}
            onChange={(e) => handleInputChange('severity', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status *
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="reported">Reported</option>
            <option value="cleaned">Cleaned</option>
          </select>
        </div>

        {/* Reported By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reported By *
          </label>
          <input
            type="text"
            value={formData.reportedBy}
            onChange={(e) => handleInputChange('reportedBy', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.reportedBy ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your name or organization"
          />
          {errors.reportedBy && (
            <p className="text-red-500 text-xs mt-1">{errors.reportedBy}</p>
          )}
        </div>

        {/* Coordinates Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Coordinates
          </label>
          <div className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            Lat: {formData.location.coordinates[1].toFixed(6)} | 
            Lng: {formData.location.coordinates[0].toFixed(6)}
          </div>
          {errors.location && (
            <p className="text-red-500 text-xs mt-1">{errors.location}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <button
            type="submit"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            {isEditing ? 'Update Location' : 'Add Location'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
