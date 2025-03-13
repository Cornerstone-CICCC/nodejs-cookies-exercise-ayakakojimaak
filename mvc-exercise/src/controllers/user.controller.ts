import { Response, Request } from "express";
import type { User } from "../types/user";
import UserModel from "../models/user.model";

/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Response
 */

const getAllUsers = (req: Request, res: Response) => {
  res.send(UserModel.getAllUsers());
};

/**
 * Create a new user
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Response
 */

const createUser = async (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(500).redirect("/signup?error=Please provide a name and password");
    return;
  }
  const user = await UserModel.createUser({ name, password });
  if (!user) {
    res.status(500).redirect("/signup?error=User already exists");
    return;
  } else {
    res.status(201).redirect("/login");
  }
};

const loginUser = async (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(400).redirect("/login?error=Please provide a name and password");
    return;
  }
  const user = await UserModel.loginUser({ name, password });
  if (!user) {
    res.status(401).redirect("/login?error=Invalid username or password");
    return;
  } else {
    req.session!.userId = user.id;
    req.session!.userName = user.name;
    req.session!.isLoggedIn = true;
    res.status(301).redirect("/member");
  }
};

const logoutUser = (req: Request, res: Response) => {
  req.session = undefined;
  res.status(301).redirect("/login");
};

export default { getAllUsers, createUser, loginUser, logoutUser };
