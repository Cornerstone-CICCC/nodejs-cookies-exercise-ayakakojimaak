import { Response, Request } from "express";

const home = (req: Request, res: Response) => {
  res.send("Hello world");
};

const about = (req: Request, res: Response) => {
  res.send("About page");
};

export default { home, about };
