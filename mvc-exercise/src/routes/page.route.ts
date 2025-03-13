import { Router } from "express";
import pageController from "../controllers/page.controller";

const pageRouter = Router();

pageRouter.get("/", pageController.home);
pageRouter.get("/about", pageController.about);

export default pageRouter;
