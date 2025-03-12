import { Request, Response, NextFunction } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const { isLoggedIn } = req.signedCookies;
  if (!isLoggedIn) {
    res.status(301).redirect("/login");
    return;
  }
  next();
};

export const isLoggedOut = (req: Request, res: Response, next: NextFunction) => {
  const { isLoggedIn, isAdmin } = req.signedCookies;
  if (isLoggedIn && isAdmin) {
    res.status(301).redirect("/admin");
    return;
  } else if (isLoggedIn) {
    res.status(301).redirect("/member");
    return;
  }

  next();
};

export default { checkAuth, isLoggedOut };
