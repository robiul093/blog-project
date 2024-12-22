import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";


const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(
                req.body
            );

            next();
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


export default validateRequest;