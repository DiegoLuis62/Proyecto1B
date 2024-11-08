import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { AuthRequest } from '../custom';

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'JWT secret is not defined' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        User.findById(decoded.id)
            .then((user) => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found' });
                }

                req.user = user as AuthRequest['user'];
                next();
            })
            .catch((error) => {
                return res.status(500).json({ message: 'Error fetching user' });
            });
    });
};
