import { NextFunction, Request, Response } from "express";
import enka from "../../config/enka";
import { ErrorResponse } from "../../models/ErrorResponse";
import { logError } from "../../utils/logError";

export default function updateCache(req: Request, res: Response, next: NextFunction) {
  enka.cachedAssetsManager
    .fetchAllContents()
    .then(() => {
      res.send({
        message: "Cache updated successfully",
      });
    })
    .catch((error) => {
      logError(error);
      next(new ErrorResponse(500, "Failed to update cache"));
    });
}
