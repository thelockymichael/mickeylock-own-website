import express, { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models";

const router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fullName, password } = req.body;

    const user = await User.findOne({
      fullName: fullName,
    });

    const passwordCorrect =
      user === null ? false : await bcrypt.compare(password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({
        user: null,
        error: "invalid username or password",
      });
    }

    const userForToken = {
      username: user?.fullName,
      id: user?._id,
    };

    const authToken = jwt.sign(userForToken, process.env.SECRET);

    return res.status(200).send({
      authToken,
      user,
    });
  } catch (error: any) {
    next(error);
  }
});
// router.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.find({}).populate("projects");

//     return res.status(200).send(user);
//   } catch (error: any) {
//     next(error);
//   }
// });

// router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const user = await User.findById(req.params.id).populate("projects");

//     return user ? res.json(user) : res.status(404).end();
//   } catch (error: any) {
//     next(error);
//   }
// });

// router.post(
//   "/register",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const findOneUser = await User.findOne({});

//       if (findOneUser) {
//         console.log("findOneUser", findOneUser);
//         // TODO
//         // Authenticate using decoded Token
//         // const body = request.body

//         // const decodeToken = getUserToken(request)
//         // const authUser = await User.findById(decodeToken.id)

//         // if (!authUser.is_admin) {
//         //   return response.status(401).json({
//         //     error: "TERMINAL LOCKED \n PLEASE CONTACT AN ADMINISTRATOR"
//         //   })
//         // }

//         return res.status(401).json({
//           error: "You need to be an administrator.",
//         });
//       }

//       const { fullName, password, about, profileImage } = req.body;

//       const saltRounds = 10;
//       const passwordHash = await bcrypt.hash(password, saltRounds);

//       const user = User.build({
//         fullName,
//         password: passwordHash,
//         about,
//         profileImage,
//         projects: [],
//       });

//       await user.save();

//       return res.status(200).send(user);
//     } catch (error: any) {
//       next(error);
//     }
//   }
// );

export { router as loginRouter };
