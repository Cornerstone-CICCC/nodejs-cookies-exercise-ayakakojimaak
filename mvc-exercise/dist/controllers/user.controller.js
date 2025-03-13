"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Response
 */
const getAllUsers = (req, res) => {
    res.send(user_model_1.default.getAllUsers());
};
/**
 * Create a new user
 * @param {Request} req
 * @param {Response} res
 * @returns {void} Response
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(500).redirect("/signup?error=Please provide a name and password");
        return;
    }
    const user = yield user_model_1.default.createUser({ name, password });
    if (!user) {
        res.status(500).redirect("/signup?error=User already exists");
        return;
    }
    else {
        res.status(201).redirect("/login");
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    if (!name || !password) {
        res.status(400).redirect("/login?error=Please provide a name and password");
        return;
    }
    const user = yield user_model_1.default.loginUser({ name, password });
    if (!user) {
        res.status(401).redirect("/login?error=Invalid username or password");
        return;
    }
    else {
        req.session.userId = user.id;
        req.session.userName = user.name;
        req.session.isLoggedIn = true;
        res.status(301).redirect("/member");
    }
});
const logoutUser = (req, res) => {
    req.session = undefined;
    res.status(301).redirect("/login");
};
exports.default = { getAllUsers, createUser, loginUser, logoutUser };
