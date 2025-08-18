import mongoose, { Schema, Document } from 'mongoose';

export interface ITrashLocation extends Document {
  name: string;
  description: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  address?: string;
  trashType: 'plastic' | 'paper' | 'glass' | 'metal' | 'organic' | 'electronic' | 'other';
  severity: 'low' | 'medium' | 'high';
  status: 'active' | 'cleaned' | 'reported';
  reportedBy: string;
  reportedAt: Date;
  cleanedAt?: Date;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TrashLocationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  address: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  trashType: {
    type: String,
    enum: ['plastic', 'paper', 'glass', 'metal', 'organic', 'electronic', 'other'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    required: true,
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['active', 'cleaned', 'reported'],
    required: true,
    default: 'active',
  },
  reportedBy: {
    type: String,
    required: true,
  },
  reportedAt: {
    type: Date,
    default: Date.now,
  },
  cleanedAt: {
    type: Date,
  },
  images: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Create a geospatial index for location-based queries
TrashLocationSchema.index({ location: '2dsphere' });

export default mongoose.models.TrashLocation || mongoose.model<ITrashLocation>('TrashLocation', TrashLocationSchema);
