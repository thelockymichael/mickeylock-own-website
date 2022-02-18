import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "./helpers/test_helper";
import { IUser, IWebsite, User, Website, Image } from "../models";
import fs from "fs";
import path from "path";

// Import image file

// import dummyImage from "./dummy-img/PortfolioPic.jpg";

jest.setTimeout(30000);

const api = supertest(app);
// TODO
// 1. Create a website
// 2. Edit name & descText
// 3. Edit aboutText and upload PROFILE IMG
// => Create DUMMY profile image PortfolioPic2_23.0.1...

describe("creation of website document and editing the website ", () => {
  beforeAll(async () => {
    await Website.deleteMany({});
    await User.deleteMany({});
    await Image.deleteMany({});

    const newUser = {
      fullName: "root",
      about: "Only user",
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
  });

  test("create a website", async () => {
    const websiteAtStart = await helper.websiteInDb();

    const newWebsite = {
      name: "Michael Lock",
      descText: "Mobile Apps || Fullstack",
      aboutText: "Hello everybody",
      uploadedImgs: [],
      selectedProfileImg: "",
      projects: [],
    };

    await api
      .post("/api/website/")
      .send(newWebsite)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const websiteAtEnd = await helper.websiteInDb();
    expect(websiteAtEnd).toHaveLength(websiteAtStart.length + 1);

    const website = websiteAtEnd.map((u) => u.name);
    expect(website).toContain(newWebsite.name);
  });

  test("update name and descText properties of a website", async () => {
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

    const updatedWebsite = {
      name: "Mickey Lock",
      descText: "Frontend || Backend",
    };

    await api
      .put("/api/website/")
      .set("Authorization", `bearer ${authToken}`)
      .send(updatedWebsite)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const websiteAtEnd = await helper.websiteInDb();
    expect(websiteAtEnd).toHaveLength(1);

    const websiteName = websiteAtEnd.map((u) => u.name);
    const websiteDesc = websiteAtEnd.map((u) => u.descText);

    expect(websiteName).toContain(updatedWebsite.name);
    expect(websiteDesc).toContain(updatedWebsite.descText);
  });

  test("update aboutText and upload profile img", async () => {
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

    const img = path.resolve(__dirname, "./dummy-img/angry-resized.png");

    const abouText = "Hello everybody!";

    await api
      .put("/api/website/")
      .set("Authorization", `bearer ${authToken}`)
      .field("aboutText", abouText)
      .attach("selectedProfileImg", img)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const websiteAtEnd = await helper.websiteInDb();
    expect(websiteAtEnd).toHaveLength(1);

    const websiteName = websiteAtEnd.map((u) => u.aboutText);

    expect(websiteName).toContain(abouText);
  });
});

afterAll(async () => {
  mongoose.connection.close();
}, 10000);
