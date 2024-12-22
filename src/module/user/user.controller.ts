import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service"


const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userService.createUserIntoDB(req.body);

        const { _id, name, email } = result;
        const sendData = { _id, name, email };

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            statusCode: 201,
            data: sendData
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: 'Validation error',
            "statusCode": 400,
            error: err,
            stack: err.stack,
        });
    }
};



const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.userLogin(req.body);

        const {token,} = result;
        res.status(200).json({
            success: true,
            message: "Login successful",
            statusCode: 200,
            data: {token}
        });
    } catch (err: any) {
        // res.status(401).json({
        //     success: false,
        //     message: "Invalid credentials",
        //     statusCode: 401,
        //     error: err,
        //     stack: err.stack,
        // });
        next(err)
    };
};



const getAllUser = async (req: Request, res: Response,) => {
    try {
        console.log(req.user)
        const result = await userService.getAllUser();

        res.status(200).json({
            success: true,
            message: "User farched successfully",
            statusCode: 200,
            data: result
        });
    } catch (err: any) {
        res.status(400).json({
            success: false,
            message: "Failed to fetched user",
            statusCode: 401,
            error: err,
            stack: err.stack,
        });
    };
}


export const userController = {
    createUser,
    userLogin,
    getAllUser
}