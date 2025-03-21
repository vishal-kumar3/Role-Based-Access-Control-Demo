import type { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: string }; // Define the `user` type here
    }
  }
}


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers['user-id'] // Mock: pass ID in header

  const users = {
    1: { id: 1, role: 'admin' },
    2: { id: 2, role: 'editor' },
    3: { id: 3, role: 'viewer' },
  };
  const user = users[parseInt(userId as string)];
  if (!user) {
    res.status(401).json({ message: 'Unauthorized' })
    return
  }
  req.user = user;
  next();
};

const rolePermissions = {
  admin: ['read:post', 'create:post', 'update:post', 'delete:post'],
  editor: ['read:post', 'create:post', 'update:post'],
  viewer: ['read:post'],
};

export const checkPermission = (permission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = rolePermissions[userRole] || [];
    if (!permissions.includes(permission)) {
      return res.status(403).json({ message: `Forbidden: ${userRole} lacks ${permission}` });
    }
    next();
  };
};
