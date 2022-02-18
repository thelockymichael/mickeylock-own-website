import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import * as helper from "./helpers/test_helper";
import { IUser, User, Image, Project, IProject } from "../models";
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
    // await Website.deleteMany({});
    await User.deleteMany({});
    await Project.deleteMany({});
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

  /** POST */
  test("create new project with name and description", async () => {
    const projectsAtStart = await helper.projectsInDb();

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

    const newProject = {
      name: "Veho GO",
      description: "React Native -mobiilisovellus.",
    };

    await api
      .post("/api/website/projects")
      .send(newProject)
      .set("Authorization", `bearer ${authToken}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const projectsAtEnd = await helper.projectsInDb();
    expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);

    const project = projectsAtEnd.map((u) => u.name);
    expect(project).toContain(newProject.name);
  });

  test("create new project with name, description, tags, date and gitHubLink", async () => {
    const projectsAtStart = await helper.projectsInDb();

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

    const newProject: IProject = {
      name: "Veho GO",
      description: "React Native -mobiilisovellus.",
      tags: ["React", "Firebase"],
      gitHubLink: "https://github.com/Vehonaattorit/VEHOGO",
      date: new Date(),
    };

    await api
      .post("/api/website/projects")
      .send(newProject)
      .set("Authorization", `bearer ${authToken}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const projectsAtEnd = await helper.projectsInDb();
    expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);

    const project = projectsAtEnd.map((u) => u.name);
    expect(project).toContain(newProject.name);
  });

  test("create new project with image, name, description, tags, date and gitHubLink", async () => {
    const projectsAtStart = await helper.projectsInDb();

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

    const newProject = {
      name: "AR Travel",
      description: "AR-tekniikkaa hyödyntä kännykkäsovellus.",
      tags: ["Android", "ARCore", "Google"],
      gitHubLink: "https://github.com/Vehonaattorit/VEHOGO",
      date: new Date(),
    };

    await api
      .post("/api/website/projects")
      .set("Authorization", `bearer ${authToken}`)
      .field("name", newProject.name)
      .field("description", newProject.description)
      .field("tags", newProject.tags)
      .field("gitHubLink", newProject.gitHubLink)
      .field("date", newProject.date.toISOString())
      .attach("image", img)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const projectsAtEnd = await helper.projectsInDb();
    expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);

    const project = projectsAtEnd.map((u) => u.name);
    expect(project).toContain(newProject.name);
  });

  /** END POST */

  /** PUT */
  test("update a project with new name and description", async () => {
    const projectsAtStart = await helper.projectsInDb();

    // Prev project

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

    const newProject = {
      name: "",
      description: "AR-tekniikkaa hyödyntä kännykkäsovellus.",
    };

    await api
      .put("/api/website/projects")
      .set("Authorization", `bearer ${authToken}`)
      .field("name", newProject.name)
      .field("description", newProject.description)
      .field("tags", newProject.tags)
      .field("gitHubLink", newProject.gitHubLink)
      .field("date", newProject.date.toISOString())
      .attach("image", img)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const projectsAtEnd = await helper.projectsInDb();
    expect(projectsAtEnd).toHaveLength(projectsAtStart.length + 1);

    const project = projectsAtEnd.map((u) => u.name);
    expect(project).toContain(newProject.name);
  });
  /** PUT END */

  // test("update name and descText properties of a website", async () => {
  //   let authToken;
  //   await api
  //     .post("/api/login")
  //     .send({
  //       fullName: "root",
  //       password: "abc123",
  //     })
  //     .then((response) => {
  //       authToken = response.body.authToken;
  //     });

  //   const updatedWebsite = {
  //     name: "Mickey Lock",
  //     descText: "Frontend || Backend",
  //   };

  //   await api
  //     .put("/api/website/")
  //     .set("Authorization", `bearer ${authToken}`)
  //     .send(updatedWebsite)
  //     .expect(200)
  //     .expect("Content-Type", /application\/json/);

  //   const websiteAtEnd = await helper.websiteInDb();
  //   expect(websiteAtEnd).toHaveLength(1);

  //   const websiteName = websiteAtEnd.map((u) => u.name);
  //   const websiteDesc = websiteAtEnd.map((u) => u.descText);

  //   expect(websiteName).toContain(updatedWebsite.name);
  //   expect(websiteDesc).toContain(updatedWebsite.descText);
  // });

  // test("update aboutText and upload profile img", async () => {
  //   let authToken;
  //   await api
  //     .post("/api/login")
  //     .send({
  //       fullName: "root",
  //       password: "abc123",
  //     })
  //     .then((response) => {
  //       authToken = response.body.authToken;
  //     });

  //   // TODO
  //   // 1. Upload profile picture
  //   // const img = fs.readFileSync(`${__dirname}/dummy-img/angry-resized.png`);
  //   const img = path.resolve(__dirname, "./dummy-img/angry-resized.png");

  //   const abouText = "Hello everybody!";

  //   await api
  //     .put("/api/website/")
  //     .set("Authorization", `bearer ${authToken}`)
  //     .field("aboutText", abouText)
  //     .attach("selectedProfileImg", img)
  //     .expect(200)
  //     .expect("Content-Type", /application\/json/);

  //   const websiteAtEnd = await helper.websiteInDb();
  //   expect(websiteAtEnd).toHaveLength(1);

  //   const websiteName = websiteAtEnd.map((u) => u.aboutText);

  //   expect(websiteName).toContain(abouText);
  // });
});

afterAll(async () => {
  mongoose.connection.close();
}, 10000);
