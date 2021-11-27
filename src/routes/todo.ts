import express, { NextFunction, Request, response, Response } from "express";
import { Todo } from "../models/todo";

require("express-async-errors");

const router = express.Router();

router.get("/api/todo", async (req: Request, res: Response) => {
  const todo = await Todo.find({});

  return res.status(200).send(todo);
});

router.get(
  "/api/todo/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await Todo.findById(id);

    // TODO
    // !!! Setup eslint . !!!

    return todo ? res.json(todo.toJSON()) : res.status(404).end();
  }
);

router.post(
  "/api/todo",
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description } = req.body;

    const todo = Todo.build({ title, description });
    await todo.save();
    return res.status(200).send(todo);
  }
);

export { router as todoRouter };
