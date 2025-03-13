"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const home = (req, res) => {
    res.send("Hello world");
};
/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Response
 */
const getAllUsers = (req, res) => {
    res.send();
};
exports.default = { home, getAllUsers };
