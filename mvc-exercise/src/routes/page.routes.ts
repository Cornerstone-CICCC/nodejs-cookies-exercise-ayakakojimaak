import { Router, Response, Request } from "express";

const pageRouter = Router();

pageRouter.get("/", (req: Request, res: Response) => {
  res.send("Hello world");
});

export default pageRouter;
