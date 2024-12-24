import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";


const blockUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.userId;
        const result = await adminService.blockUserIntoDB(id);

        res.status(200).json({
            success: true,
            message: 'User blocked successfully',
            statusCode: 200,
            data: result
        });
    } catch (err) {
        next(err)
    };
};


const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id;

        // const result = 
        await adminService.deleteBlogByAdminIntoDB(id);

        res.status(200).json({
            success: true,
            message: 'Blog deleted successfully',
            statusCode: 200,
        });
    } catch (err) {
        next(err)
    };
};



export const adminController = {
    blockUser,
    deleteBlog
}