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
    res.status(500).send("Please provide a name and password");
    return;
  }
  const user = await UserModel.createUser({ name, password });
  if (!user) {
    res.status(500).send("User already exists");
    return;
  } else {
    res.status(201).send(user);
  }
};

const loginUser = async (req: Request<{}, {}, Omit<User, "id">>, res: Response) => {
  const { name, password } = req.body;
  if (!name || !password) {
    res.status(500).render("login", { err: "Please provide a name and password" });
    return;
  }
  const user = await UserModel.createUser({ name, password });
  if (!user) {
    res.status(500).render("login", { err: "User already exists" });
    return;
  } else {
    res.status(301).redirect("member");
  }
};

export default { getAllUsers, createUser, loginUser };
