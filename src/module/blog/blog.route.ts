import { Router } from "express";
import { blogController } from "./blog.controller";
import auth from "../../middlewares/auth";


const router = Router();


router.patch('/:id',auth('user'), blogController.updateBlog);
router.delete('/:id',auth('user'), blogController.deleteBlog);
router.post('/',auth('user'), blogController.createBlog);
router.get('/', blogController.getAllBlogs);



export const BlogRoute = router;