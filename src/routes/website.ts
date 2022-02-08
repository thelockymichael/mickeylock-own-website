import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { Website } from "../models";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const website = await Website.findOne({}).populate("projects");

    return website ? res.status(200).send(website) : res.status(404).end();
  } catch (error: any) {
    next(error);
  }
});

// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { name, descText, aboutText, profileImage, projects } = req.body;

//     const website = Website.build({
//       name,
//       descText,
//       aboutText,
//       profileImage,
//       projects,
//     });

//     const savedWebsite = await website.save();

//     return res.status(200).send(savedWebsite);
//   } catch (error: any) {
//     next(error);
//   }
// });

// router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const website = await Website.findById(req.params.id).populate("projects");

//     return website ? res.json(website) : res.status(404).end();
//   } catch (error: any) {
//     next(error);
//   }
// });

// router.post("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { fullName, password, about, profileImage } = req.body;

//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     const website = Website.build({
//       fullName,
//       password: passwordHash,
//       about,
//       profileImage,
//     });

//     await website.save();

//     return res.status(200).send(website);
//   } catch (error: any) {
//     next(error);
//   }
// });

export { router as websiteRouter };
