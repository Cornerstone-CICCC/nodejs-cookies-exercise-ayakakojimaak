"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const page_controllers_1 = __importDefault(require("../controllers/page.controllers"));
const pageRouter = (0, express_1.Router)();
pageRouter.get("/", page_controllers_1.default.home);
pageRouter.get("/about", page_controllers_1.default.about);
exports.default = pageRouter;
