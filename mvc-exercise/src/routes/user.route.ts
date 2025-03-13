import { Router } from "express";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.post("/create", userController.createUser);
userRouter.post("/login", userController.loginUser);
userRouter.get("/logout", userController.logoutUser);

export default userRouter;
