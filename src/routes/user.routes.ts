import { Router, Response } from 'express';
import { updateUserController, desactivateUserController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/authMiddleware';
import { updateUserPermissionMiddleware, deleteUserPermissionMiddleware } from '../middlewares/permissionMiddleware';
import { AuthRequest } from '../custom';

const userRoutes = Router();

// Actualizar usuario
async function UpdateUser(req: AuthRequest, res: Response) {
  try {
    const userId = req.params.userId || req.user?.id;
    if (!userId) throw new Error('User ID is missing');

    const updates = req.body;
    const updatedUser = await updateUserController(userId, updates);

    res.status(200).json({
      message: 'User updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
}

// Desactivar usuario
async function DesactivateUser(req: AuthRequest, res: Response) {
  try {
    const userId = req.params.userId || req.user?.id;
    if (!userId) throw new Error('User ID is missing');

    await desactivateUserController(userId);
    res.status(200).json({
      message: 'User deactivated successfully',
    });
  } catch (error) {
    res.status(400).json({
      message: (error as Error).message,
    });
  }
}

// Rutas de usuario
userRoutes.put('/update/:userId?', authMiddleware, updateUserPermissionMiddleware, UpdateUser);
userRoutes.delete('/desactivate/:userId?', authMiddleware, deleteUserPermissionMiddleware, DesactivateUser);

export default userRoutes;
