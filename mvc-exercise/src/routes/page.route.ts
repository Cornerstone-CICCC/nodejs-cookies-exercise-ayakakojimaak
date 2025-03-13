import { Router } from "express";
import pageController from "../controllers/page.controller";

const pageRouter = Router();

pageRouter.get("/", pageController.home);
pageRouter.get("/about", pageController.about);
pageRouter.get("/signup", pageController.signup);
pageRouter.get("/login", pageController.login);
pageRouter.get("/member", pageController.member);

export default pageRouter;
