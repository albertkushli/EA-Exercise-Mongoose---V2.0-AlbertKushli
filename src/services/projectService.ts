import { ProjectModel, IProject } from '../models/project.js';

// CREATE
export const createProject = async (data: Partial<IProject>) => {
  const newProject = new ProjectModel(data);
  return await newProject.save();
};

// GET BY ID (con Populate)
export const getProjectById = async (id: string) => {
  return await ProjectModel.findById(id).populate('organization');
};

// UPDATE
export const updateProject = async (id: string, data: Partial<IProject>) => {
  return await ProjectModel.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
//export const deleteProject = async (id: string) => {
 // return await ProjectModel.findByIdAndDelete(id);
//};

// LIST ALL (usando .lean())
export const listAllProjects = async () => {
  return await ProjectModel.find().lean();
};