import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IWebsite, Website } from "../models";

// File filter
import { fileFilter } from "../utils/fileFilter";

// Image file UPLOAD import
import multer from "multer";

import { makeThumbnail } from "../utils/resize";
import { validateToken } from "../utils/auth";

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
  "/:id",
  upload.single("selectedProfileImg"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate jwt token
      validateToken(req, res);

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

      // Add image to uploadedImgs array
      const { uploadedImgs } = updateWebsite;

      const updateUploadedImgs = uploadedImgs
        ? uploadedImgs.concat(multerFile?.filename as string)
        : [multerFile?.filename as string];

      const website = await Website.findByIdAndUpdate(
        req.params.id,
        {
          ...updateWebsite,
          uploadedImgs: updateUploadedImgs,
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

// TODO
// 1. READ all images / GET ALL IMAGES
// . Remove image
// . Select profile picture

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

export { router as websiteRouter };
