import express, { NextFunction, Request, response, Response } from "express";
import { nextTick } from "process";
import { Todo } from "../models/todo";

const router = express.Router();

router.get("/api/todo", async (req: Request, res: Response) => {
  const todo = await Todo.find({});

  return res.status(200).send(todo);
});

router.get(
  "/api/todo/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await Todo.findById(req.params.id);

      return todo ? response.json(todo) : response.status(404).end();
    } catch (error: any) {
      console.log("WAT IS THIS?");
      next(error);
    }
  }
);

router.post("/api/todo", async (req, res) => {
  const { title, description } = req.body;

  const todo = Todo.build({ title, description });
  await todo.save();

  return res.status(201).send(todo);
});

export { router as todoRouter };
