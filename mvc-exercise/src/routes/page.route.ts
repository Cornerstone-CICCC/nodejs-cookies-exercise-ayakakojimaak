import { Router } from "express";
import pageController from "../controllers/page.controller";
import { isLoggedIn, isNotLoggedIn } from "../middleware/auth.middleware";
const pageRouter = Router();

pageRouter.get("/", pageController.home);
pageRouter.get("/about", pageController.about);
pageRouter.get("/signup", isLoggedIn, pageController.signup);
pageRouter.get("/login", isLoggedIn, pageController.login);
pageRouter.get("/member", isNotLoggedIn, pageController.member);

export default pageRouter;
