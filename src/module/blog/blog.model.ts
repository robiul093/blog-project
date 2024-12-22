import { model, Schema } from "mongoose";
import { TBlog } from "./blog.interface";


const createBlogSchema = new Schema<TBlog>({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    isPublished: {
        type: Boolean,
        default: true
    },
}, { timestamps: true });



const Blog = model<TBlog>('Blog', createBlogSchema);

export default Blog;