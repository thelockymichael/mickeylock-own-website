import express, { NextFunction, Request, Response } from "express";
import { Image, IProject, IUser, Project, User } from "../models";

import multer from "multer";
import { fileFilter } from "../utils/fileFilter";
import { saveImage } from "../utils/resize";

require("express-async-errors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage, fileFilter });

const router = express.Router();

// TODO
// 1. Post NEW Project
// 2. GET NEW PROJECT(s)
// 3. Delete PROJECt
// 4. EDIT PROJECT

router.get("/", async (req: Request, res: Response) => {
  const project = await Project.find({}).populate("image");

  return res.status(200).send(project);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  // TODO
  // !!! Setup eslint . !!!

  return project ? res.json(project.toJSON()) : res.status(404).end();
});

router.post(
  "/",
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    // TODO
    // 1. Receive TAGS as array
    /**
        name: string;
        description: string;
        tags?: string[];
        gitHubLink?: string;
        image?: IImage;
        date?: Date;
     */

    /**
         * {
    "name": " VEHO GO",
    "description": "Hieno projekti",
    "tags": ["React", "Firebase"],
    "gitHubLink": "https://github.com/Vehonaattorit/VEHOGO",
    "date": "2022-02-17T15:59:01.332Z"
}

         */

    try {
      // const project: IProject = req.body;
      let multerFile: Express.Multer.File | undefined = req.file;

      console.log("updateProject", req.body);
      console.log("multerFile", multerFile);

      const finalImg = await saveImage(multerFile);
      let newImage;

      console.log("1. finalImg", finalImg?.name);
      if (finalImg) {
        newImage = await Image.build(finalImg);
        await newImage.save();
      }

      const project: IProject = { ...req.body, image: newImage };

      const newProject = await Project.build(project);

      await newProject.save();

      return newProject
        ? res.status(200).json({
            code: 200,
            message: "New project created.",
            newProject,
          })
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

export { router as projectRouter };
