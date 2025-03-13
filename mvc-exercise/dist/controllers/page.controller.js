"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = (req, res) => {
    res.render("home");
};
const about = (req, res) => {
    res.send("About page");
};
const signup = (req, res) => {
    res.render("signup");
};
const member = (req, res) => {
    res.render("member");
};
const login = (req, res) => {
    res.render("login");
};
exports.default = { home, about, signup, member, login };
