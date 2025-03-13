import { v4 as uuidv4 } from "uuid";

class UserModel {
  private users = [
    {
      id: uuidv4(),
      name: "John",
      password: "",
    },
    {
      id: uuidv4(),
      name: "Jane",
      password: "",
    },
  ];
  getAllUsers() {
    return this.users;
  }
}

export { UserModel };
