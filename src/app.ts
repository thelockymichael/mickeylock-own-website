import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

const app: Application = express();

// app.use(cors);
// app.use(express.json());
// app.use(express.urlencoded());

// Serve static client app

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000"]; // Not sure, if I need this line

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors(options));

app.use(express.static(path.join(__dirname, "../client/build/")));

app.use(bodyParser.json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello World !");
});

export default app;
