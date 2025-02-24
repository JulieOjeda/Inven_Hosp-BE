import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId?: string; // userId es opcional
        }
    }
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const publicRoutes = ['/user/login', '/user/register']; // Rutas públicas
    const authHeader = req.headers['authorization'];

    if (publicRoutes.includes(req.path)) {
        return next();
    }

    // Si no hay token, devuelve un error 403 (Prohibido)
    if (!authHeader) {
        res.status(403).json({ message: 'No token provided.' });
        return
    }
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    // Verifica el token
    jwt.verify(token, 'secret-key', (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
            // Si el token ha expirado
            if (err.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Token expired.' });
                return
            }
            res.status(401).json({ message: 'Unauthorized.' });
            return
        }

        // Si el token es válido, guarda el ID del usuario en la solicitud
        req.userId = (decoded as { id: string }).id;

        // Continúa con la siguiente función middleware
        next();
    });
}