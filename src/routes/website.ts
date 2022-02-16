import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { IWebsite, Website } from "../models";

// File filter
import { fileFilter } from "../utils/fileFilter";

// Image file UPLOAD import
import multer from "multer";
// Read file
import fs from "fs";

import { makeThumbnail } from "../utils/resize";
import { validateToken } from "../utils/auth";
import { mongo } from "mongoose";
import { IImage, Image } from "../models/image";

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

// 1. Get website data
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const website = await Website.findOne({})
      .populate("selectedProfileImg")
      .populate("uploadedImgs")
      .populate("projects");

    return website ? res.status(200).send(website) : res.status(404).end();
  } catch (error: any) {
    next(error);
  }
});

// 2. Get Binary Data from selectedProfileImg
router.get(
  "/selectedProfileImg",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const website = await Website.findOne({}).populate("selectedProfileImg");

      return website ? res.status(200).send(website) : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

// 3. Get Binary Data from uploadedImgs
router.get(
  "/uploadedImgs",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const website = await Website.findOne({}).populate("uploadedImgs");

      return website ? res.status(200).send(website) : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

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

// Initialize website for the first time
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Find single website document
    // Init website for the first time
    const findWebsite = await Website.findOne({});

    if (findWebsite) {
      // Validate jwt token
      validateToken(req, res);
    }

    const website = Website.build({
      name: "Michael Lock",
      descText: "Mobile Apps || Fullstack",
      aboutText: "Hello everybody",
      uploadedImgs: [],
      projects: [],
    });

    await website.save();

    return res.status(200).send(website);
  } catch ({ message }) {
    res.status(401).json({
      user: null,
      error: message,
    });
  }
});

// TODO 1
// 1. IMPLEMENT in website interface, PUT
// 2. Display files in postman get website data
// 3. GET and display binary data images from MongoDB in FRONTEND

const saveImage = (multerFile?: Express.Multer.File) => {
  if (multerFile) {
    const img = fs.readFileSync(multerFile?.path);
    const encodedImage = img.toString("base64");

    // console.log("encodedImage", encodedImage);

    const finalImg = {
      name: multerFile?.filename,
      imgType: multerFile.mimetype,
      img: Buffer.from(encodedImage, "base64"),
    };
    console.log("finalImage", finalImg);

    return finalImg;
  }
};

/** END */
router.put(
  "/",
  upload.single("selectedProfileImg"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate jwt token
      // validateToken(req, res);

      const updateWebsite: IWebsite = req.body;
      let multerFile: Express.Multer.File | undefined = req.file;

      console.log("request.file", multerFile);

      const finalImg = saveImage(multerFile);
      let newImage;

      console.log("1. finalImg", finalImg?.name);
      if (finalImg) {
        newImage = await Image.build(finalImg);
        await newImage.save();
      }

      const website = await Website.findOneAndUpdate(
        {
          $query: "",
        },
        {
          ...updateWebsite,
          $push: {
            uploadedImgs: newImage,
          },
          selectedProfileImg: newImage,
        },
        { new: true }
      ).populate("selectedProfileImg");

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
      validateToken(req, res);

      const website: IWebsite | null = await Website.findOne({});

      return website
        ? res.status(200).send(website.uploadedImgs)
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

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

      await Image.findByIdAndRemove(id);

      // Remove field if id matches

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
            message: "Image is deleted.",
            updatedWebsite: updatedWebsite,
          })
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

router.put(
  "/uploaded/images/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate jwt token
      // validateToken(req, res);

      const { id } = req.params;

      // TODO
      // 1. Find IMAGE from Images
      // 2. Replace selectedProfileImg with found IMAGE

      const replaceImage = await Image.findById(id);

      // console.log("replaceImage", replaceImage);

      // const selectedProfileImg = req.params.id;

      const updatedWebsite = await Website.findOneAndUpdate(
        {
          $query: "",
        },
        {
          selectedProfileImg: replaceImage,
        },
        { new: true }
      );

      return updatedWebsite
        ? res.status(200).json({
            code: 200,
            message: "Profile image is now updated.",
            updatedWebsite: updatedWebsite,
          })
        : res.status(404).end();
    } catch (error: any) {
      next(error);
    }
  }
);

export { router as websiteRouter };
