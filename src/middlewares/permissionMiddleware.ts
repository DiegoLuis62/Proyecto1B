import { Response, NextFunction } from 'express';
import { AuthRequest } from '../custom';

const checkPermission = (permission: string, req: AuthRequest, res: Response, next: NextFunction) => {
    const userIdFromParams = req.params.userId || req.user?.id;
    const userIdFromToken = req.user?.id;

    if (req.user?.hasPermission(permission) || userIdFromToken === userIdFromParams) {
        return next();
    }

    return res.status(403).json({ message: 'Access denied' });
};

export const updateUserPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    checkPermission('edit_user', req, res, next);
};

export const deleteUserPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    checkPermission('delete_user', req, res, next);
};

export const updateBookPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    checkPermission('edit_book', req, res, next);
};

export const deleteBookPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    checkPermission('delete_book', req, res, next);
};

export const createBookPermissionMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    checkPermission('create_book', req, res, next);
};
