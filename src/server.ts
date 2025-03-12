import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import pageRouter from "./routes/page.routes";

dotenv.config();

// Create Express server
const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cookieParser(process.env.COOKIE_SECRET_KEY)); // Use cookies
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
