import { IArtifact, ICharacter, IWeapon } from "enka-network-api";
import { NextFunction, Request, Response } from "express";

import enka from "../../config/enka";
import { ErrorResponse } from "../../models/ErrorResponse";

type Build = {
  character: ICharacter;
  artifacts: IArtifact[];
  weapon: IWeapon;
};

export default function getGenshinAccount(req: Request, res: Response, next: NextFunction) {
  try {
    const uid = req.params.uid;

    if (typeof uid !== "string" || isNaN(Number(uid))) {
      return next(new ErrorResponse(400, "Invalid UID"));
    }

    enka.fetchUser(Number(uid)).then((user) => {
      const builds: Build[] = [];

      for (const character of user.characters) {
        const goodCharacter = character.toGOOD();

        builds.push({
          character: goodCharacter,
          artifacts: character.artifacts.map((artifact) => artifact.toGOOD()),
          weapon: character.weapon.toGOOD(),
        });
      }

      res.send({
        name: user.nickname,
        level: user.level,
        signature: user.signature,
        builds,
      });
    });

    // res.send({
    //   name: "name",
    //   level: 60,
    //   signature: "user.signature",
    //   characters: [],
    // });
  } catch (error) {
    next(new ErrorResponse(500, "Internal Server Error"));
  }
}
