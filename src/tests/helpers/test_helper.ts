import { Project, User, Website } from "../../models";

// Users
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

const projectsInDb = async () => {
  const projects = await Project.find({}).populate("image");
  return projects.map((u) => u.toJSON());
};

// Single website document
const websiteInDb = async () => {
  const website = await Website.find({});
  return website.map((u) => u.toJSON());
};

export { usersInDb, projectsInDb, websiteInDb };
