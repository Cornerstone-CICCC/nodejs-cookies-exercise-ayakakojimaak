"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const page_route_1 = __importDefault(require("./routes/page.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.set("view engine", "ejs"); // Set view engine to EJS
app.set("views", path_1.default.join(__dirname, "../src/views")); // EJS templates location
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Router
app.use("/api/user", user_route_1.default);
app.use("/", page_route_1.default);
// Fall back
app.use((req, res) => {
    res.send("Hello world");
});
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
