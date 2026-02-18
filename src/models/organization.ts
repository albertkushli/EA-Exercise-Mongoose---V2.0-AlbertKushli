import { Schema, model } from 'mongoose';

// 1. Contract for the Organization entity
export interface IOrganization {
  _id?: string;
  name: string;
  country: string;
}

// 2. Database Schema
const organizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true },
  country: { type: String, required: true }
});

export const OrganizationModel = model<IOrganization>('Organization', organizationSchema);