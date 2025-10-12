import { NextFunction, Request, Response } from "express";
import config from "../config/env";

export default function checkOrigin(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  if (origin && !config.allowedOrigins.includes(origin)) {
    return res.status(403).send("Forbidden");
  }
  next();
}
