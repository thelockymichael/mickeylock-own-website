import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "./helpers/test_helper";
import { IUser, User, Website } from "../models";
import bcrypt from "bcrypt";

jest.setTimeout(30000);

const api = supertest(app);

describe("creation of website document and editing the website ", () => {
  // TODO

  //
  test("create a website", async () => {});
});

afterAll(async () => {
  await Website.deleteMany({});

  mongoose.connection.close();
}, 10000);
