import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import type { User } from "../types/user";

class UserModel {
  private defaultPassword = bcrypt.hashSync("12345", 10);
  private users: User[] = [
    {
      id: uuidv4(),
      name: "John",
      password: this.defaultPassword,
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
    if (userExists === -1) return false;

    const isMatch = bcrypt.compareSync(password, this.users[userExists].password);
    if (!isMatch) return false;

    return this.users[userExists];
  }
}

export default new UserModel();
