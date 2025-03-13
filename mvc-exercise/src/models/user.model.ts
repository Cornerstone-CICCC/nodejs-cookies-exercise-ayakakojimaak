import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import type { User } from "../types/user";

class UserModel {
  private users: User[] = [
    {
      id: uuidv4(),
      name: "John",
      password: "12345",
    },
    {
      id: uuidv4(),
      name: "Jane",
      password: "67890",
    },
  ];
  getAllUsers() {
    return this.users;
  }
  createUser(newUser: Omit<User, "id">) {
    const { name, password } = newUser;
    const userExists = this.users.findIndex((user) => user.name === name);
    if (userExists !== -1) return false;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = {
      id: uuidv4(),
      name,
      password: hashedPassword,
    };
    this.users.push(user);
    return user;
  }
  loginUser(user: Omit<User, "id">) {
    const { name, password } = user;
    const userExists = this.users.findIndex((u) => u.name === name);
    const isMatch = bcrypt.compareSync(password, user.password);
    if (userExists === -1 || !isMatch) return false;
  }
}

export default new UserModel();
