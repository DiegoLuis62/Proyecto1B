import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';

// Acción para registrar usuario
export const registerUserAction = async (userData: Partial<IUser>) => {
  const user = new User(userData);
  await user.save();
  return user;
};

// Acción para iniciar sesión
export const loginUserAction = async (email: string, password: string) => {
  const user = await User.findOne({ email, isActive: true });
  if (!user) {
    throw new Error('User not found or inactive');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { user, token };
};

// Acción para verificar token
export const verifyTokenAction = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
