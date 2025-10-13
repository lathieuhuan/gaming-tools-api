import { NextFunction, Request, Response } from "express";

export default function checkOrigin(allowedOrigins: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const origin = req.headers.origin;

    if (origin && !allowedOrigins.includes(origin)) {
      return res.status(403).send("Forbidden");
    }

    next();
  };
}
