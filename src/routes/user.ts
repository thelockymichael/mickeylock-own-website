import express, { NextFunction, Request, response, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user";

const router = express.Router();

router.get("/api/user", async (req: Request, res: Response) => {
  const user = await User.find({});

  return res.status(200).send(user);
});

router.get(
  "/api/user/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.findById(req.params.id);

      return user ? response.json(user) : response.status(404).end();
    } catch (error: any) {
      console.log("WAT IS THIS?");
      next(error);
    }
  }
);

router.post("/api/user", async (req: Request, res: Response) => {
  const { fullName, password, about, profileImage } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = User.build({ fullName, passwordHash, about, profileImage });
  await user.save();

  return res.status(201).send(user);
});

export { router as userRouter };
