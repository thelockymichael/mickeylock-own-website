import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "../tests/helpers/test_helper";
import { ITodo, Todo } from "../models/todo";

const api = supertest(app);

beforeEach(async () => {
  await Todo.deleteMany({});

  const todoObjects = helper.initialTodos.map((todo) => Todo.build(todo));
  const promiseArray = todoObjects.map((todo) => todo.save());
  await Promise.all(promiseArray);

  // let todoObject = Todo.build(helper.initialTodos[0]);
  // await todoObject.save();

  // todoObject = Todo.build(helper.initialTodos[1]);
  // await todoObject.save();

  // todoObject = Todo.build(helper.initialTodos[2]);
  // await todoObject.save();
});

test("all todos are returned", async () => {
  const response = await api.get("/api/todo");

  expect(response.body).toHaveLength(helper.initialTodos.length);
});

test("a specific todo is within the returned todos", async () => {
  const response = await api.get("/api/todo");

  const contents = response.body.map((r: ITodo) => r.title);
  expect(contents).toContain("Do the dishes");
});

test("a valid todo can be added", async () => {
  const newTodo = {
    title: "async/await simplifies making async calls",
    description: "This is true",
  };

  await api
    .post("/api/todo/")
    .send(newTodo)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/todo");

  const titles = response.body.map((r) => r.title);

  expect(response.body).toHaveLength(helper.initialTodos.length + 1);
  expect(titles).toContain("async/await simplifies making async calls");
});

test("todo without title is not added", async () => {
  const newTodo = {
    description: "This should fail.",
  };

  await api.post("/api/todo").send(newTodo).expect(400);

  const response = await api.get("/api/todo");

  expect(response.body).toHaveLength(helper.initialTodos.length);
});

afterAll(() => {
  mongoose.connection.close();
}, 10000);
