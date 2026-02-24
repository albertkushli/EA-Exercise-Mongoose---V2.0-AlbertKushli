import { UserModel, IUser } from '../models/user.js';

/**
 * USER SERVICE: Business logic for User CRUD and Analytics
 */

// CREATE
export const createUser = async (data: Partial<IUser>): Promise<IUser> => {
    return await new UserModel(data).save();
};

// READ (with Populate)
export const getUserById = async (id: string): Promise<IUser | null> => {
    return await UserModel.findById(id).populate('organization').lean();
};

// UPDATE
export const updateUser = async (id: string, data: Partial<IUser>): Promise<IUser | null> => {
    return await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
};

// DELETE
export const deleteUser = async (id: string): Promise<IUser | null> => {
    return await UserModel.findByIdAndDelete(id);
};

// LIST (using Lean for performance)
export const listAllUsers = async (): Promise<IUser[]> => {
    return await UserModel.find().lean();
};

// AGGREGATION PIPELINE: Users per Country
export const getStatsByCountry = async () => {
    return await UserModel.aggregate([
        {
            $lookup: {
                from: 'organizations',
                localField: 'organization',
                foreignField: '_id',
                as: 'orgData'
            }
        },
        { $unwind: '$orgData' }, // Flatten the array from lookup
        {
            $group: {
                _id: '$orgData.country', // Group by the country field from the joined data
                totalUsers: { $sum: 1 },
                userNames: { $push: '$name' }
            }
        },
        { $project: { country: '$_id', totalUsers: 1, userNames: 1, _id: 0 } }
    ]);
};