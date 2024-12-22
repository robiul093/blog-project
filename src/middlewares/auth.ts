import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../app/config";

const auth = (userRole: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization?.split(' ')[1]


            if (!token) {
                throw new Error('you are not authorize');
            };


            jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
                if (err) {
                    throw new Error('You are not authorized')
                };

                const { role } = decoded as JwtPayload;

                
                if(userRole && role !== userRole){
                    throw new Error('Not match role')
                }
                
                req.user = decoded as JwtPayload;
                next();
            })

        } catch (err) {
            if (err instanceof ZodError) {
                return next({
                    status: 400,
                    message: 'Validation Error',
                    errors: err.errors
                });
            };
            next(err);
        }
    }
}


export default auth;