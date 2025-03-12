"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middleware/auth.middleware");
const pageRouter = (0, express_1.Router)();
const users = [{ id: 1, username: "admin", password: "admin12345", admin: true }];
// Displays home page
pageRouter.get("/", (req, res) => {
    res.status(200).render("index");
});
// Displays login form
pageRouter.get("/login", auth_middleware_1.isLoggedOut, (req, res) => {
    res.status(200).render("login");
});
// Displays Admin form
pageRouter.get("/admin", auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render("admin");
});
pageRouter.get("/member", auth_middleware_1.checkAuth, (req, res) => {
    res.status(200).render("member");
});
// Register new user
pageRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user) {
        res.status(409).json({ message: "Username is taken!" });
        return;
    }
    users.push({
        id: users.length + 1,
        username,
        password,
        admin: false,
    });
    res.cookie("isLoggedIn", true, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true,
    });
    res.cookie("username", username, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: true,
    });
    res.cookie("message", "Here is a cookie for you 🍪", {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: false,
    });
    res.cookie("isAdmin", false, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: false,
    });
    res.status(201).redirect("/member");
});
// Log in user
pageRouter.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username && u.password === password);
    if (!user) {
        res.status(404).redirect("/login");
        return;
    }
    res.cookie("isLoggedIn", true, {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        signed: true, // Cookie is stored in signedCookies obj
    });
    res.cookie("username", username, {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        signed: true,
    });
    res.cookie("message", "Here is a cookie for you 🍪", {
        maxAge: 5 * 60 * 1000, // 5 minutes
        httpOnly: true,
        signed: false, // Cookie is stored in normal cookies obj (default)
    });
    res.cookie("isAdmin", false, {
        maxAge: 5 * 60 * 1000,
        httpOnly: true,
        signed: false,
    });
    res.status(200).redirect("/member");
});
// Log out user
pageRouter.post("/logout", (req, res) => {
    res.clearCookie("isLoggedIn");
    res.clearCookie("username");
    res.clearCookie("message");
    res.clearCookie("isAdmin");
    res.status(301).redirect("/login");
});
// Get username from cookie
pageRouter.get("/check", auth_middleware_1.checkAuth, (req, res) => {
    const { username } = req.signedCookies;
    const { message } = req.cookies;
    res.status(200).json({ username, message });
});
exports.default = pageRouter;
