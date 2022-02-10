import express, { NextFunction, Request, response, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models";
import { getTokenFrom, validateToken } from "../utils/auth";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.find({}).populate("projects");

    return res.status(200).send(user);
  } catch (error: any) {
    next(error);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).populate("projects");

    return user ? res.json(user) : res.status(404).end();
  } catch (error: any) {
    next(error);
  }
});

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO
      // 1. IF no USER --> create ONE user
      // 2. IF 1 USER --> user must be logged in to register
      //    other users.
      // 3. REGISTER other user
      const findOneUser = await User.findOne({});

      if (findOneUser) {
        validateToken(req, res);
        // console.log("findOneUser", findOneUser);

        // const token = getTokenFrom(req);
        // console.log("token", token);

        // const decodedToken = jwt.verify(token, process.env.SECRET);
        // if (!token || !decodedToken.id) {
        //   return response
        //     .status(401)
        //     .json({ error: "token missing or invalid" });
        // }
      }

      const { fullName, password, about, profileImage } = req.body;

      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);

      const user = User.build({
        fullName,
        passwordHash,
        about,
        profileImage,
        projects: [],
      });

      await user.save();

      return res.status(200).send(user);
    } catch ({ message }) {
      res.status(401).json({
        user: null,
        error: message,
      });
    }
  }
);

export { router as userRouter };
