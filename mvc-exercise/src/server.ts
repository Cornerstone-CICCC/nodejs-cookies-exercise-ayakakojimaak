import express, { Response, Request } from "express";
import path from "path";
import cookiesSession from "cookie-session";
import dotenv from "dotenv";
import pageRouter from "./routes/page.routes";
dotenv.config();

const app = express();

// Middleware
app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Router
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
