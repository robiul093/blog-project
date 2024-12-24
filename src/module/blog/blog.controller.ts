/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { blogService } from "./blog.service";


const createBlog = async (req: Request, res: Response) => {
    try {
        req.body.author = req?.user?.id;
        const result = await blogService.createBlogIntoDB(req.body);

        const populateData = await result.populate('author')

        const sendData = {
            _id: populateData?._id,
            title: populateData?.title,
            content: populateData?.content,
            author: populateData?.author
        }

        res.status(201).json({
            success: true,
            message: "Blog created successfully",
            statusCode: 201,
            data: sendData,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Failed to create blog",
            statusCode: 500,
            error: err,
            stack: err.stack,
        })
    }
};


const getAllBlogs = async (req: Request, res: Response) => {
    try {
        const result = await blogService.getAllBlogsFromDB(req.query);

        res.status(201).json({
            success: true,
            message: "Blogs fetched successfully",
            statusCode: 201,
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Failed to fetched blog",
            statusCode: 500,
            error: err,
            stack: err.stack,
        })
    }
};


const updateBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const userId = req.user?.id;
        const result = await blogService.updateBlogsIntoDB(blogId, userId, req.body);

        const sendData = {
            id: result?._id,
            title: result?.title,
            content: result?.content,
            author: result?.author
        }

        res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            statusCode: 200,
            data: sendData,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Failed to update blog",
            statusCode: 500,
            error: err,
            stack: err.stack,
        })
    }
};



const deleteBlog = async (req: Request, res: Response) => {
    try {
        const blogId = req.params.id;
        const userId = req.user?.id;

        // const result =
        await blogService.deletBlogsFromDB(blogId, userId);

        res.status(201).json({
            success: true,
            message: "Blog deleted successfully",
            statusCode: 201,
            // data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: "Failed to delete blog",
            statusCode: 500,
            error: err,
            stack: err.stack,
        })
    }
};



export const blogController = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog,
}