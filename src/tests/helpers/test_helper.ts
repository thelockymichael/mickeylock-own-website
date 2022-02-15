import { User, Website } from "../../models";

// Users
const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

// Single website document
const websiteInDb = async () => {
  const website = await Website.find({});
  return website.map((u) => u.toJSON());
};

export { usersInDb, websiteInDb };
