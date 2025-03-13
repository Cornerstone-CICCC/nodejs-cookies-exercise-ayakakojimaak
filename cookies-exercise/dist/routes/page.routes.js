"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const bcrypt_1 = __importDefault(require("bcrypt"));
dotenv_1.default.config();
const pageRouter = (0, express_1.Router)();
const passwordKey = process.env.PASSWORD_KEY;
if (!passwordKey) {
    throw new Error("Missing PASSWORD_KEY");
}
const userPassword = bcrypt_1.default.hashSync(passwordKey, 10);
const users = [{ id: "waianoerwo", password: userPassword, username: "admin" }];
// Displays home page
pageRouter.get("/", (req, res) => {
    res.status(200).render("index");
});
// Displays login form
pageRouter.get("/login", auth_middleware_1.isLoggedOut, (req, res) => {
    res.status(200).render("login");
});
pageRouter.get("/member", auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render("member");
});
// Register new user
pageRouter.post("/register", (req, res) => {
    var _a, _b;
    const username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
    const password = (_b = req.session) === null || _b === void 0 ? void 0 : _b.password;
    console.log(username, password);
    const user = users.find((u) => u.username === username);
    if (user) {
        res.status(409).json({ message: "Username is taken!" });
        return;
    }
    const hashedPassword = bcrypt_1.default.hashSync(password, 10);
    users.push({
        id: (0, uuid_1.v4)(),
        username,
        password: hashedPassword,
    });
    res.status(201).redirect("/login");
});
// Log in user
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        res.status(404).redirect("/login");
        return;
    }
    const isMatch = bcrypt_1.default.compareSync(password, user.password);
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
pageRouter.post("/logout", (req, res) => {
    req.session = null;
    res.status(301).redirect("/login");
});
// Get username from cookie
pageRouter.get("/check", auth_middleware_1.checkAuth, (req, res) => {
    var _a;
    const username = (_a = req.session) === null || _a === void 0 ? void 0 : _a.username;
    res.status(200).json({ username });
});
exports.default = pageRouter;
