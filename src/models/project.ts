import { Schema, model, Document, Types } from 'mongoose';

// Interface
export interface IProject extends Document {
  name: string;
  description: string;
  status: 'ACTIVE' | 'DONE' | 'ON_HOLD';
  organization: Types.ObjectId;
}

// Schema
const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'DONE', 'ON_HOLD'], 
    default: 'ACTIVE' 
  },
  organization: { 
    type: Schema.Types.ObjectId, 
    ref: 'Organization', 
    required: true 
  }
});

// ESTA ES LA LÍNEA QUE TE DA EL ERROR
export const ProjectModel = model<IProject>('Project', projectSchema);