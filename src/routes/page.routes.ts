import { Router, Request, Response } from "express";
import { checkAuth, isLoggedOut } from "../middleware/auth.middleware";
import { User } from "../types/user";

const pageRouter = Router();

const users: User[] = [{ id: 1, username: "admin", password: "admin12345", admin: true }];

// Displays home page
pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});

// Displays login form
pageRouter.get("/login", isLoggedOut, (req: Request, res: Response) => {
  res.status(200).render("login");
});

// Displays Admin form
pageRouter.get("/admin", checkAuth, (req: Request, res: Response) => {
  res.status(200).render("admin");
});

pageRouter.get("/member", checkAuth, (req: Request, res: Response) => {
  res.status(200).render("member");
});

// Register new user
pageRouter.post("/register", (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user) {
    res.status(409).json({ message: "Username is taken!" });
    return;
  }
  users.push({
    id: users.length + 1,
    username,
    password,
    admin: false,
  });

  res.cookie("isLoggedIn", true, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    signed: true,
  });
  res.cookie("username", username, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    signed: true,
  });
  res.cookie("message", "Here is a cookie for you 🍪", {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    signed: false,
  });
  res.cookie("isAdmin", false, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    signed: false,
  });
  res.status(201).redirect("/member");
});

// Log in user
pageRouter.post("/login", (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    res.status(404).redirect("/login");
    return;
  }
  res.cookie("isLoggedIn", true, {
    maxAge: 5 * 60 * 1000, // 5 minutes
    httpOnly: true,
    signed: true, // Cookie is stored in signedCookies obj
  });
  res.cookie("username", username, {
    maxAge: 5 * 60 * 1000, // 5 minutes
    httpOnly: true,
    signed: true,
  });
  res.cookie("message", "Here is a cookie for you 🍪", {
    maxAge: 5 * 60 * 1000, // 5 minutes
    httpOnly: true,
    signed: false, // Cookie is stored in normal cookies obj (default)
  });
  res.cookie("isAdmin", false, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    signed: false,
  });
  res.status(200).redirect("/member");
});

// Log out user
pageRouter.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("isLoggedIn");
  res.clearCookie("username");
  res.clearCookie("message");
  res.clearCookie("isAdmin");
  res.status(301).redirect("/login");
});

// Get username from cookie
pageRouter.get("/check", checkAuth, (req: Request, res: Response) => {
  const { username } = req.signedCookies;
  const { message } = req.cookies;
  res.status(200).json({ username, message });
});

export default pageRouter;
