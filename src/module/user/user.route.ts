import { Router } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";

const router = Router();

router.post('/register', validateRequest(
    userValidation.registerUserValidationSchema),
    userController.createUser
);

router.post('/login', userController.userLogin);
router.get('/user', userController.getAllUser)

export const UserRoute = router;