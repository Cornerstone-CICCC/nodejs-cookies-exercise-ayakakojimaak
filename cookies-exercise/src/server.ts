import express, { NextFunction, Request, Response } from "express";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import path from "path";
import pageRouter from "./routes/page.routes";

dotenv.config();

// Create Express server
const app = express();
const port = process.env.PORT || 3000;

const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;

if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("Missing COOKIE_SIGN_KEY");
}
// Middlewares
app.use(
  cookieSession({
    name: "session",
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 5 * 60 * 1000, // 5 minutes
  })
);
app.use(express.json()); // Allow JSON
app.use(express.urlencoded({ extended: true })); // Allow POST submission
app.set("view engine", "ejs"); // Set view engine to EJS
app.set("views", path.join(__dirname, "../src/views")); // EJS templates location
app.use(express.static(path.join(__dirname, "public"))); // Set public assets directory

// Routes
app.use("/", pageRouter);

// Fallback route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).render("404");
});

// serve
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
