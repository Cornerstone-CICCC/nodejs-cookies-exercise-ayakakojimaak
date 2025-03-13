"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = (req, res) => {
    res.send("Hello world");
};
const about = (req, res) => {
    res.send("About page");
};
exports.default = { home, about };
