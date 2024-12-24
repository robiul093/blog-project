import { TBlog } from "./blog.interface";
import Blog from "./blog.model"



const createBlogIntoDB = async (payload: TBlog) => {
    const result = await Blog.create(payload);

    return result;
};


const getAllBlogsFromDB = async (query: Record<string, unknown>) => {

    const queryObj = { ...query };

    let search = '';
    if (query && query.search) {
        search = query?.search as string;
    };

    const searchQuery = Blog.find({
        $or: [
            { title: { $regex: search, $options: 'i' } },
            { content: { $regex: search, $options: 'i' } },
        ]
    });

    // filtering
    const excludeFields = ['search', 'sortBy', 'sortOrder'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const filterQuery = searchQuery.find(queryObj)

    // sorting
    let sortBy = '-createdAt'
    if (query?.sortBy) {
        sortBy = query?.sortBy as string
    }

    let sortOrder = 1;
    if (query.sortOrder) {
        sortOrder = query?.sortOrder === 'dsce' ? -1 : 1
    }
    const sortQuery = filterQuery.sort({ [sortBy]: sortOrder } as Record<string, 1 | -1>);

    const result = await sortQuery.find();

    return result;
};


const updateBlogsIntoDB = async (blogId: string, userId: string, payload: Partial<TBlog>) => {
    const blog = await Blog.findById(blogId).populate('author');

    if (!blog) {
        throw new Error('You are not real user');
    };

    if (!blog.author._id.equals(userId)) {
        throw new Error('You are not authorised');
    }

    const result = await Blog.findByIdAndUpdate(blogId, payload, { new: true }).populate('author');

    return result;
};


const deletBlogsFromDB = async (blogId: string, userId: string) => {

    const blog = await Blog.findById(blogId).populate('author');

    if (!blog) {
        throw new Error('You are not real user');
    };

    if (!blog.author._id.equals(userId)) {
        throw new Error('You are not authorised');
    }

    const result = await Blog.findByIdAndUpdate(blogId, { isPublished: false }, { new: true })

    return result;
};




export const blogService = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    updateBlogsIntoDB,
    deletBlogsFromDB,
}