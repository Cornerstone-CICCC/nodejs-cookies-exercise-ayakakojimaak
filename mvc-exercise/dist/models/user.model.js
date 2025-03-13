"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserModel {
    constructor() {
        this.users = [
            {
                id: (0, uuid_1.v4)(),
                name: "John",
                password: "12345",
            },
            {
                id: (0, uuid_1.v4)(),
                name: "Jane",
                password: "67890",
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
        const isMatch = bcrypt_1.default.compareSync(password, user.password);
        if (userExists === -1 || !isMatch)
            return false;
    }
}
exports.default = new UserModel();
