"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedOut = exports.checkAuth = void 0;
const checkAuth = (req, res, next) => {
    const { isLoggedIn } = req.signedCookies;
    if (!isLoggedIn) {
        res.status(301).redirect("/login");
        return;
    }
    next();
};
exports.checkAuth = checkAuth;
const isLoggedOut = (req, res, next) => {
    const { isLoggedIn, isAdmin } = req.signedCookies;
    if (isLoggedIn && isAdmin) {
        res.status(301).redirect("/admin");
        return;
    }
    else if (isLoggedIn) {
        res.status(301).redirect("/member");
        return;
    }
    next();
};
exports.isLoggedOut = isLoggedOut;
exports.default = { checkAuth: exports.checkAuth, isLoggedOut: exports.isLoggedOut };
