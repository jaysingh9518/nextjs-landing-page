import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    name: string;
    email: string;
    phone: string;
    travelPackage: string;
    travelDate: string;
    guests: number;
    message: string;
    createdAt: Date;
    updatedAt: Date;
  }

const leadSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    travelPackage: { type: String },
    travelDate: { type: String },
    guests: { type: Number },
    message: { type: String },
}, { timestamps: true });

const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', leadSchema);
export default Lead;