import type { RequestHandler } from 'express';
import error from '../utils/error.js';
import jwt from 'jsonwebtoken';
import { env } from '../configurations/envConfig.js';

type UserData = {
    email: string;
};

const authenticate: RequestHandler = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            throw new Error();
        }

        const userData = jwt.verify(token, env.APP_JWT_SECRET) as UserData;

        req.user = userData;
        next();
    } catch {
        throw error(401, 108, 'Token tidak tidak valid atau kadaluwarsa');
    }
};

export default authenticate;
