import { IArtifact, ICharacter, IWeapon } from "enka-network-api";
import { NextFunction, Request, Response } from "express";

import enka from "../../config/enka";
import { ErrorResponse } from "../../models/ErrorResponse";
import { logError } from "../../utils/logError";

type Build = {
  character: ICharacter;
  artifacts: IArtifact[];
  weapon: IWeapon;
};

export default function getGenshinAccount(req: Request, res: Response, next: NextFunction) {
  const { uid = "" } = req.params;
  const _uid = Number(uid);

  if (uid.length < 9 || isNaN(_uid)) {
    return next(new ErrorResponse(400, "Invalid UID"));
  }

  enka
    .fetchUser(_uid)
    .then((user) => {
      const builds: Build[] = [];

      for (const character of user.characters) {
        if (character.characterData.isMannequin) {
          continue;
        }

        const goodCharacter = character.toGOOD();

        if (character.characterData.isTraveler) {
          const element = character.characterData.element?.name.get("en");

          goodCharacter.key = `${element} Traveler`;
        }

        builds.push({
          character: goodCharacter,
          artifacts: character.artifacts.map((artifact) => artifact.toGOOD()),
          weapon: character.weapon.toGOOD(),
        });
      }

      res.send({
        uid: user.uid,
        name: user.nickname,
        level: user.level,
        worldLevel: user.worldLevel,
        signature: user.signature,
        builds,
        // enkaProfile: user.enkaProfile,
        ttl: user.ttl,
      });
    })
    .catch((error) => {
      logError(error);
      next(new ErrorResponse(500, "Internal Server Error"));
    });
}
