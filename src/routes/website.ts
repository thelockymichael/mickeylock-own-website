import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IWebsite, Website } from "../models";

// File filter
import { fileFilter } from "../utils/fileFilter";

// Image file UPLOAD import
import multer from "multer";

import { makeThumbnail } from "../utils/resize";
import { validateToken } from "../utils/auth";
import { mongo } from "mongoose";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

interface CustomRequest<T> extends Request {
  body: T;
}

const upload = multer({ storage, fileFilter });

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const website = await Website.findOne({}).populate("projects");

    return website ? res.status(200).send(website) : res.status(404).end();
  } catch (error: any) {
    next(error);
  }
});

// TODO
// Don't remove. Might need this later
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

/* END */

// 4. UPDATE single item
router.put(
  "/",
  upload.single("selectedProfileImg"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate jwt token
      // validateToken(req, res);

      const updateWebsite: IWebsite = req.body;
      let multerFile: Express.Multer.File | undefined = req.file;

      let thumb;
      console.log("request.file", multerFile);

      if (multerFile) {
        thumb = await makeThumbnail(
          multerFile.path,
          "./thumbnails/" + multerFile.filename
        );

        console.log("thumb", thumb);
      }

      //         $push: { projects: project },
      const website = await Website.findOneAndUpdate(
        {
          $query: "",
        },
        {
          ...updateWebsite,
          $addToSet: {
            uploadedImgs: multerFile?.filename,
          },
          selectedProfileImg: multerFile?.filename,
        },
        { new: true }
      );

      return website
        ? res.status(200).json({
            code: 200,
            message: "Website updated",
            updatedWebsite: website,
          })
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

router.get(
  "/uploaded/images",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate jwt token
      // validateToken(req, res);

      const website: IWebsite | null = await Website.findOne({});

      return website
        ? res.status(200).send(website.uploadedImgs)
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

// import { promisify } from 'util'

// import unlinkAsync = promisify(fs.unlink)

// TODO
// 1. [X] READ all images / GET ALL IMAGES
// TODO
// 2. Remove image

interface CustomDelete<T> extends Request {
  body: T;
}

router.delete(
  "/uploaded/images/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate jwt token
      // validateToken(req, res);

      const { id } = req.params;

      console.log("DELETE IMAGE", id);

      const updatedWebsite = await Website.findOneAndUpdate(
        {
          $query: "",
        },
        {
          $pull: {
            uploadedImgs: {
              $in: [id],
            },
          },
        },
        { new: true }
      );

      return updatedWebsite
        ? res.status(200).json({
            code: 200,
            message: "Website updated",
            updatedWebsite: updatedWebsite,
          })
        : res.status(404).end();
      // db.collection("users").updateOne(
      //   { user: "some userID" },
      //   { $pull: { incoming: { $in: ["removeMe", "removeMeToo"] } } }
      // );

      // const updateUploadedImgs = uploadedImgs
      //   ? uploadedImgs.concat(multerFile?.filename as string)
      //   : [multerFile?.filename as string];
      // //         $push: { projects: project },
      // const website = await Website.findOneAndUpdate(
      //   {
      //     $query: "",
      //     referenceId: {
      //       $ne: [new mongo.ObjectID(req.params.referenceId)],
      //     },
      //   },
      //   {
      //     ...updateWebsite,
      //     $addToSet: {
      //       uploadedImgs: multerFile?.filename,
      //     },
      //     selectedProfileImg: multerFile?.filename,
      //   },
      //   { new: true }
      // );

      // return website
      //   ? res.status(200).json({
      //       code: 200,
      //       message: "Website updated",
      //       updatedWebsite: website,
      //     })
      //   : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);
// 3. Select profile picture

export { router as websiteRouter };
