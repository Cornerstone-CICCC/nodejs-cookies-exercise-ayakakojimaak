"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const uuid_1 = require("uuid");
class UserModel {
    constructor() {
        this.users = [
            {
                id: (0, uuid_1.v4)(),
                name: "John",
                password: "",
            },
            {
                id: (0, uuid_1.v4)(),
                name: "Jane",
                password: "",
            },
        ];
    }
    getAllUsers() {
        return this.users;
    }
}
exports.UserModel = UserModel;
