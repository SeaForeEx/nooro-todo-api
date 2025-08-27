import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const prisma = new PrismaClient();
const app: Application = express();

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "http://localhost:3000" }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// List
app.get("/tasks", async (_req, res) => {
    try {
        const tasks = await prisma.task.findMany({ orderBy: { createdAt: "desc" } });
        res.json(tasks);
    } catch (err) {
        console.error("Error fetching tasks:", err);
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});

// Get Single Task
app.get("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });

    try {
        const task = await prisma.task.findUnique({ where: { id } });
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        console.error("Error fetching task:", err);
        res.status(500).json({ error: "Failed to fetch task" });
    }
});

// Create
app.post("/tasks", async (req, res) => {
    const { title, color } = req.body ?? {};
    if (!title || !color) return res.status(400).json({ message: "title and color are required" });
    const task = await prisma.task.create({ data: { title: title.trim(), color: color.trim() } });
    res.status(201).json(task);
});

// Update
app.put("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });
  
    const data: { title?: string; color?: string; completed?: boolean } = {};
    if ("title" in req.body) data.title = String(req.body.title).trim();
    if ("color" in req.body) data.color = String(req.body.color).trim();
    if ("completed" in req.body) data.completed = Boolean(req.body.completed);
  
    try {
      const task = await prisma.task.update({ where: { id }, data });
      res.json(task);
    } catch (e: any) {
      if (e?.code === "P2025") return res.status(404).json({ message: "Task not found" });
      res.status(500).json({ message: "Failed to update task" });
    }
});

// Delete
app.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: "Invalid id" });
    try {
      await prisma.task.delete({ where: { id } });
      res.status(204).end();
    } catch (e: any) {
      if (e?.code === "P2025") return res.status(404).json({ message: "Task not found" });
      res.status(500).json({ message: "Failed to delete task" });
    }
});