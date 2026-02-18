import { Schema, model, Types } from 'mongoose';
import { IOrganization } from './organization.js';

// We define the shape of the user in the database
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'USER';
  organization: Types.ObjectId | IOrganization; // Can be an ID or a populated Object
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['ADMIN', 'EDITOR', 'USER'], default: 'USER' },
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true }
});

export const UserModel = model<IUser>('User', userSchema);