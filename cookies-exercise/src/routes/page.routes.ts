import { Router, Request, Response } from "express";
import { checkAuth, isLoggedOut } from "../middleware/auth.middleware";
import dotenv from "dotenv";
import { User } from "../types/user";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import { log } from "util";
dotenv.config();

const pageRouter = Router();

const passwordKey = process.env.PASSWORD_KEY;
if (!passwordKey) {
  throw new Error("Missing PASSWORD_KEY");
}
const userPassword = bcrypt.hashSync(passwordKey, 10);
const users: User[] = [{ id: "waianoerwo", password: userPassword, username: "admin" }];

// Displays home page
pageRouter.get("/", (req: Request, res: Response) => {
  res.status(200).render("index");
});

// Displays login form
pageRouter.get("/login", isLoggedOut, (req: Request, res: Response) => {
  res.status(200).render("login");
});

pageRouter.get("/member", checkAuth, (req: Request, res: Response) => {
  res.status(200).render("member");
});

// Register new user
pageRouter.post("/register", (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const username = req.session?.username;
  const password = req.session?.password;
  console.log(username, password);

  const user = users.find((u) => u.username === username);
  if (user) {
    res.status(409).json({ message: "Username is taken!" });
    return;
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  users.push({
    id: uuidv4(),
    username,
    password: hashedPassword,
  });
  res.status(201).redirect("/login");
});

// Log in user
pageRouter.post("/login", (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (!user) {
    res.status(404).redirect("/login");
    return;
  }
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    res.status(401).redirect("/login");
    return;
  }
  if (req.session) {
    req.session.username = username;
    req.session.isLoggedIn = true;
  }
  res.status(200).redirect("/member");
});

// Log out user
pageRouter.post("/logout", (req: Request, res: Response) => {
  req.session = null;
  res.status(301).redirect("/login");
});

// Get username from cookie
pageRouter.get("/check", checkAuth, (req: Request, res: Response) => {
  const username = req.session?.username;
  res.status(200).json({ username });
});

export default pageRouter;
