"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const page_routes_1 = __importDefault(require("./routes/page.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.set("views engine", "ejs");
app.set("views", path_1.default.join(__dirname, "views"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Router
app.use("/", page_routes_1.default);
// Fall back
app.use((req, res) => {
    res.send("Hello world");
});
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
