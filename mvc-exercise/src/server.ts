import express, { Response, Request } from "express";
import path from "path";
import cookiesSession from "cookie-session";
import dotenv from "dotenv";
import pageRouter from "./routes/page.route";
import userRouter from "./routes/user.route";
dotenv.config();

const app = express();

// Middleware

app.set("view engine", "ejs"); // Set view engine to EJS
app.set("views", path.join(__dirname, "../src/views")); // EJS templates location
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
app.use("/api/user", userRouter);
app.use("/", pageRouter);

// Fall back
app.use((req: Request, res: Response) => {
  res.send("Hello world");
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
