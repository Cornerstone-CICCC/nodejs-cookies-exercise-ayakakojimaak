import express, { Response, Request } from "express";
import path from "path";
import cookiesSession from "cookie-session";
import dotenv from "dotenv";
import pageRouter from "./routes/page.route";
import userRouter from "./routes/user.route";
dotenv.config();

const app = express();

// Middleware

const SIGN_KEY = process.env.COOKIE_SIGN_KEY;
const ENCRYPT_KEY = process.env.COOKIE_ENCRYPT_KEY;

if (!SIGN_KEY || !ENCRYPT_KEY) {
  throw new Error("COOKIE_SIGN_KEY or COOKIE_ENCRYPT_KEY is not set");
}

app.use(
  cookiesSession({
    name: "session",
    keys: [SIGN_KEY, ENCRYPT_KEY],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);
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
