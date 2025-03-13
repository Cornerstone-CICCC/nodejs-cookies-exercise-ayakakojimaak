"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.defaultPassword = bcrypt_1.default.hashSync("12345", 10);
        this.users = [
            {
                id: (0, uuid_1.v4)(),
                name: "John",
                password: this.defaultPassword,
            },
        ];
    }
    getAllUsers() {
        return this.users;
    }
    createUser(newUser) {
        const { name, password } = newUser;
        const userExists = this.users.findIndex((user) => user.name === name);
        if (userExists !== -1)
            return false;
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const user = {
            id: (0, uuid_1.v4)(),
            name,
            password: hashedPassword,
        };
        this.users.push(user);
        return user;
    }
    loginUser(user) {
        const { name, password } = user;
        const userExists = this.users.findIndex((u) => u.name === name);
        if (userExists === -1)
            return false;
        const isMatch = bcrypt_1.default.compareSync(password, this.users[userExists].password);
        if (!isMatch)
            return false;
        return this.users[userExists];
    }
}
exports.default = new UserModel();
