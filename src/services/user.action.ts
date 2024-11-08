import User, { IUser } from '../models/user.model';

// Acción para actualizar un usuario por su ID
export const updateUserById = async (userId: string, updates: Partial<IUser>): Promise<IUser | null> => {
  const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true }).select('-password');
  if (!updatedUser) throw new Error('User not found');
  return updatedUser;
};

// Acción para desactivar un usuario por su ID
export const desactivateUserById = async (userId: string): Promise<void> => {
  const user = await User.findByIdAndUpdate(userId, { isActive: false });
  if (!user) throw new Error('User not found');
};
