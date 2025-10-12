import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../models/ErrorResponse";

export default function errorHandler(err: ErrorResponse, req: Request, res: Response, next: NextFunction) {
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
}
