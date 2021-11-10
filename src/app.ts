import express, { Application, Request, Response } from "express";

import * as dotenv from "dotenv";

dotenv.config();

const app: Application = express();

let listenPort = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World !");
});

app.listen(listenPort, () => {
  console.log(`Connected successfully on port ${listenPort}`);
});
