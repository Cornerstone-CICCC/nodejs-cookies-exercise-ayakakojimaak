"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedOut = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(301).redirect("/login");
        return;
    }
    next();
};
exports.checkAuth = checkAuth;
const isLoggedOut = (req, res, next) => {
    if (req.session && req.session.isLoggedIn) {
        res.status(301).redirect("/member");
        return;
    }
    next();
};
exports.isLoggedOut = isLoggedOut;
exports.default = { checkAuth: exports.checkAuth, isLoggedOut: exports.isLoggedOut };
