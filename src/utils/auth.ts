import express, { NextFunction, Request, response, Response } from "express";
import jwt from "jsonwebtoken";

const getTokenFrom = (request: Request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }

  return null;
};

const validateToken = (req: Request, res: Response) => {
  const token = getTokenFrom(req);
  console.log("token", token);

  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }
};

export { getTokenFrom, validateToken };
