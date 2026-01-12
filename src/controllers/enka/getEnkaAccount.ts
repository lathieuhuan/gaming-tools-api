import { NextFunction, Request, Response } from "express";

import enka from "../../config/enka";
import { ErrorResponse } from "../../models/ErrorResponse";
import { logError } from "../../utils/logError";

type GameAccount = {
  hash: string;
  player?: {
    name: string;
    level: number;
    worldLevel: number;
    signature?: string;
    uid?: number;
  };
};

export default function getEnkaAccount(req: Request, res: Response, next: NextFunction) {
  const { profile = "" } = req.params;

  if (!profile) {
    return next(new ErrorResponse(400, "Missing profile"));
  }

  enka
    .fetchEnkaGenshinAccounts(profile)
    .then((accounts) => {
      const gameAccounts = accounts
        .filter((account) => account.hoyoType === 0)
        .map<GameAccount>((account) => {
          const { user } = account;

          return {
            hash: account.hash,
            player: user
              ? {
                  name: user.nickname || profile,
                  level: user.level,
                  worldLevel: user.worldLevel,
                  signature: user.signature ?? undefined,
                  uid: account.uid ?? undefined,
                }
              : undefined,
          };
        });

      res.send({
        profile,
        gameAccounts,
      });
    })
    .catch((error) => {
      logError(error);
      next(new ErrorResponse(500, "Internal Server Error"));
    });

  // enka.fetchEnkaGenshinBuilds("", "").then((builds) => {
  //   builds.as[0].character.artifacts;
  // });
}
