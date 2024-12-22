import { Router } from "express";
import { adminController } from "./admin.controller";
import auth from "../../middlewares/auth";


const router = Router();

router.patch('/users/:userId/block', auth('admin'), adminController.blockUser);
router.delete('/blogs/:id', auth('admin'), adminController.deleteBlog);

export const adminRoute = router;