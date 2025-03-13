"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = exports.isNotLoggedIn = void 0;
const isNotLoggedIn = (req, res, next) => {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
    if (!user) {
        return res.redirect("/login");
    }
    next();
};
exports.isNotLoggedIn = isNotLoggedIn;
const isLoggedIn = (req, res, next) => {
    var _a;
    const user = (_a = req.session) === null || _a === void 0 ? void 0 : _a.userId;
    if (user) {
        return res.redirect("/member");
    }
    next();
};
exports.isLoggedIn = isLoggedIn;
