import { Response, Request } from "express";

const home = (req: Request, res: Response) => {
  res.send("Hello world");
};

const about = (req: Request, res: Response) => {
  res.send("About page");
};

const signup = (req: Request, res: Response) => {
  res.render("signup");
};

const member = (req: Request, res: Response) => {
  res.render("member");
};

const login = (req: Request, res: Response) => {
  res.render("login");
};

export default { home, about, signup, member, login };
