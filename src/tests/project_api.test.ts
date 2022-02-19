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

describe("creating and editing projects ", () => {
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

  describe("create", () => {
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
  });

  describe("update", () => {
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
      // First project in Array
      let projectId = projectsAtStart[0].id;
      const updateProject = {
        id: projectId,
        name: "Haunted House",
        description: "React Nativella tehty sovellus.",
      };

      await api
        .put("/api/website/projects")
        .send(updateProject)
        .set("Authorization", `bearer ${authToken}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      console.log("projectId [0]", projectsAtStart[0].id);
      const projectsAtEnd = await helper.projectsInDb();
      console.log("projectId [0] end", projectsAtEnd[0].id);

      expect(projectsAtEnd).toHaveLength(projectsAtStart.length);

      expect(projectsAtEnd[0].name).toContain(updateProject.name);
      expect(projectsAtEnd[0].description).toContain(updateProject.description);
    });

    test("update a project with new name, description, tags, date and gitHubLink", async () => {
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
      // First project in Array
      let projectId = projectsAtStart[0].id;
      const updateProject = {
        id: projectId,
        name: "EasyDiary",
        description: "Facebook-looking website created in vanilla JavaScript.",
        tags: ["JavaScript", "NodeJS", "MariaDB"],
        gitHubLink: "https://google.com",
        date: new Date(),
      };

      await api
        .put("/api/website/projects")
        .send(updateProject)
        .set("Authorization", `bearer ${authToken}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const projectsAtEnd = await helper.projectsInDb();

      expect(projectsAtEnd).toHaveLength(projectsAtStart.length);

      expect(projectsAtEnd[0].name).toContain(updateProject.name);
      expect(projectsAtEnd[0].description).toContain(updateProject.description);
      expect(projectsAtEnd[0].tags).toEqual(updateProject.tags);
    });

    test("update a project with new image, name, description, tags, date and gitHubLink", async () => {
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
      // First project in Array
      let projectId = projectsAtStart[0].id;
      const updateProject = {
        id: projectId,
        name: "EasyDiary",
        description: "Facebook-looking website created in vanilla JavaScript.",
        tags: ["JavaScript", "NodeJS", "MariaDB"],
        gitHubLink: "https://google.com",
        date: new Date(),
      };

      await api
        .put("/api/website/projects")
        .send(updateProject)
        .set("Authorization", `bearer ${authToken}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const projectsAtEnd = await helper.projectsInDb();

      expect(projectsAtEnd).toHaveLength(projectsAtStart.length);

      expect(projectsAtEnd[0].name).toContain(updateProject.name);
      expect(projectsAtEnd[0].description).toContain(updateProject.description);
      expect(projectsAtEnd[0].tags).toEqual(updateProject.tags);
      expect(projectsAtEnd[0].gitHubLink).toContain(updateProject.gitHubLink);
      expect(projectsAtEnd[0].date).toEqual(updateProject.date);
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

      let projectId = projectsAtStart[1].id ? projectsAtStart[1].id : "";
      const updateProject = {
        id: projectId,
        name: "CoffeeShop",
        description: "CoffeeShop mobile app and website.",
        tags: ["Flutter", "Mocha", "PostgreSQL"],
        gitHubLink: "https://github.com/Vehonaattorit/VEHOGO",
        date: new Date(),
      };

      await api
        .put("/api/website/projects")
        .set("Authorization", `bearer ${authToken}`)
        .field("id", updateProject.id)
        .field("name", updateProject.name)
        .field("description", updateProject.description)
        .field("tags", updateProject.tags)
        .field("gitHubLink", updateProject.gitHubLink)
        .field("date", updateProject.date.toISOString())
        .attach("image", img)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const projectsAtEnd = await helper.projectsInDb();
      expect(projectsAtEnd).toHaveLength(projectsAtStart.length);

      expect(projectsAtEnd[1].name).toContain(updateProject.name);
      expect(projectsAtEnd[1].description).toContain(updateProject.description);
      expect(projectsAtEnd[1].tags).toEqual(updateProject.tags);
      expect(projectsAtEnd[1].gitHubLink).toContain(updateProject.gitHubLink);
      expect(projectsAtEnd[1].date).toEqual(updateProject.date);

      // TODO
      // Get IMAGE name
      console.log("projectsAtEnd[1].image?.name", projectsAtEnd[1].image?.name);

      expect(projectsAtEnd[1].image?.name).toContain("angry-resized.png");
    });
    /** PUT END */
  });

  describe("remove", () => {
    /** PUT */
    test("remove a project", async () => {
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
      // First project in Array
      let projectToDelete = projectsAtStart[0];

      await api
        .delete(`/api/website/projects/${projectToDelete.id}`)
        .set("Authorization", `bearer ${authToken}`)
        .expect(200);

      const projectsAtEnd = await helper.projectsInDb();

      expect(projectsAtEnd).toHaveLength(projectsAtStart.length - 1);

      const names = projectsAtEnd.map((r) => r.name);

      expect(names).not.toContain(projectToDelete.name);
    });
  });
});

afterAll(async () => {
  mongoose.connection.close();
}, 10000);
