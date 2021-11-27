import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "../tests/helpers/test_helper";
import { ITodo, Todo } from "../models/todo";

const api = supertest(app);

beforeEach(async () => {
  await Todo.deleteMany({});
  await Todo.insertMany(helper.initialTodos);
});

describe("when there is initially some todos saved", () => {
  test("all todos are returned", async () => {
    const response = await api.get("/api/todo");

    expect(response.body).toHaveLength(helper.initialTodos.length);
  });

  test("a specific todo is within the returned todos", async () => {
    const response = await api.get("/api/todo");

    const contents = response.body.map((r: ITodo) => r.title);
    expect(contents).toContain("Do the dishes");
  });
});

// TODO
// viewing a specific note'
// succeeds with a valid id
// fails with statuscode 404 if note does not exist
// fails with statuscode 400 id is invalid

describe("addition of a new note", () => {
  test("succeeds with valid data", async () => {
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

  test("fails with status code 400 if todo data invaild", async () => {
    const newTodo = {
      description: "This should fail.",
    };

    await api.post("/api/todo").send(newTodo).expect(400);

    const response = await api.get("/api/todo");

    expect(response.body).toHaveLength(helper.initialTodos.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
}, 10000);
