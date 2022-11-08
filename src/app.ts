import express, { Application } from "express";
import cors from "cors";
import path from "path";

import mongoose from "mongoose";

import config from "./utils/config";

// Middleware
import {
  unknownEndpoint,
  errorHandler,
  requestLogger,
} from "./utils/middlware";
import {
  userRouter,
  websiteRouter,
  projectRouter,
  loginRouter,
} from "./routes";

const app: Application = express();

const options: cors.CorsOptions = {
  credentials: true,
  origin: true,
};

app.use(cors(options));
app.use(express.static(path.join(__dirname, "../client/build")));

/* FOR IMAGES */
app.use("/thumbnails", express.static("thumbnails"));
app.use(express.static("uploads"));
/* END */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware
app.use(requestLogger);

mongoose
  .connect(config.MONGO_URI)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    if (req.headers.host?.slice(0, 4) === "www.") {
      var newHost = req.headers.host.slice(4);
      return res.redirect(301, "https://" + newHost + req.originalUrl);
    }

    if (
      req.headers.host === "https://heroku-base-app-attempt-02.herokuapp.com/"
    )
      return res.redirect(301, "https://www.mickeylock.fi");
    if (req.headers["x-forwarded-proto"] !== "https")
      return res.redirect("https://" + req.headers.host + req.url);
    else return next();
  } else return next();
});

// TODO
// START HERE

// TODO
// User registration / login

// Website router
app.use("/api/website", websiteRouter);

// User router
app.use("/api/user", userRouter);

// Login router
app.use("/api/login", loginRouter);

// Project router
app.use("/api/website/projects", projectRouter);

// All other GET requests not handled will return to our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// Handle requests with unknown endpoint
app.use(unknownEndpoint);

// Last loaded middleware
app.use(errorHandler);

export default app;
