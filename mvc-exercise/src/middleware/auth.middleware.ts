import { Request, Response, NextFunction } from "express";

export const isNotLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = req.session?.userId;
  if (!user) {
    return res.redirect("/login");
  }
  next();
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const user = req.session?.userId;
  if (user) {
    return res.redirect("/member");
  }
  next();
};
