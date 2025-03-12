"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
dotenv_1.default.config();
// Create Express server
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
// Middlewares
app.use((0, cookie_parser_1.default)(process.env.COOKIE_SECRET_KEY)); // Use cookies
app.use(express_1.default.json()); // Allow JSON
app.use(express_1.default.urlencoded({ extended: true })); // Allow POST submission
app.set("view engine", "ejs"); // Set view engine to EJS
app.set("views", path_1.default.join(__dirname, "../src/views")); // EJS templates location
app.use(express_1.default.static(path_1.default.join(__dirname, "public"))); // Set public assets directory
// Routes
app.use("/", page_routes_1.default);
// Fallback route
app.use((req, res, next) => {
    res.status(404).render("404");
});
// serve
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
