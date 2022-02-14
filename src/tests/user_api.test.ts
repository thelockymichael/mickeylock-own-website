import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "./helpers/test_helper";
import { IUser, User } from "../models";
import bcrypt from "bcrypt";

jest.setTimeout(30000);

const api = supertest(app);

describe("creation of first user and registering other users with first created user", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    // console.log("users at start ", usersAtStart.length);

    const newUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    await api
      .post("/api/user/register")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.fullName);
    expect(usernames).toContain(newUser.fullName);
  });

  test("creation fails without jsonwebtoken and shows proper statuscode", async () => {
    const usersAtStart = await helper.usersInDb();

    let newUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    await api
      .post("/api/user/register")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    newUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    const result = await api
      .post("/api/user/register")
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("jwt must be provided");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test("creation succeeds with jsonwebtoken and shows proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    let newUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    await api
      .post("/api/user/register")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    newUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    let authToken;
    await api
      .post("/api/login")
      .send({
        fullName: "root",
        password: "abc123",
      })
      .then((response) => {
        authToken = response.body.authToken;
      });

    const result = await api
      .post("/api/user/register")
      .set("Authorization", `bearer ${authToken}`)
      .send(newUser)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `fullName` to be unique.");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test("creation succeeds with jsonwebtoken", async () => {
    const usersAtStart = await helper.usersInDb();

    let newUser = {
      fullName: "root",
      about: "Duplicate user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    await api
      .post("/api/user/register")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    newUser = {
      fullName: "Matti Meikalainen",
      about: "Another user",
      password: "abc123",
      profileImage:
        "https://images.unsplash.com/photo-1615789591457-74a63395c990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZG9tZXN0aWMlMjBjYXR8ZW58MHx8MHx8&w=1000&q=80",
      projects: [],
    };

    let authToken;
    await api
      .post("/api/login")
      .send({
        fullName: "root",
        password: "abc123",
      })
      .then((response) => {
        authToken = response.body.authToken;
      });

    await api
      .post("/api/user/register")
      .set("Authorization", `bearer ${authToken}`)
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 2);
  });
});

afterAll(() => {
  mongoose.connection.close();
}, 10000);
