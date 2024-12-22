import { z } from "zod";

const registerUserValidationSchema = z.object({
    name: z.string({ 
        required_error: 'Name is required' 
    }).min(3).max(30),
    email: z.string({
        required_error: 'Email is required'
    }).email(),
    password: z.string({
        required_error: 'Password is required'
    }).min(6, {message: 'Password can not be less than 6 characters'}),
    role: z.enum(["user", "admin"]).default('user'),
    isBlocked: z.boolean().optional(),
});



export const userValidation = {
    registerUserValidationSchema,
}