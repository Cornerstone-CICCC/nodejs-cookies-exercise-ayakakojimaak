import { Response, Request } from "express";
import { UserModel } from "../models/user.model";

const home = (req: Request, res: Response) => {
  res.send("Hello world");
};

/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Response
 */

const getAllUsers = (req: Request, res: Response) => {
  res.send();
};

export default { home, getAllUsers };
