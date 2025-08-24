import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 4000;

app.use(express.json());

// 👇 Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.json({ ok: true });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server!");
});

app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
