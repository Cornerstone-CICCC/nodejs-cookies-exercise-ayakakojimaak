import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    res.status(301).redirect("/login");
    return;
  }
  next();
};

export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    res.status(301).redirect("/member");
    return;
  }

  next();
};

export default { checkAuth, isLoggedOut };
