import { Router } from "express";
import getGenshinAccount from "../controllers/enka/getGenshinAccount";
import getEnkaAccount from "../controllers/enka/getEnkaAccount";

const router = Router();

router.get("/uid/:uid", getGenshinAccount);

router.get("/profile/:profile", getEnkaAccount);

export default router;
