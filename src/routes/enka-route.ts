import { Router } from "express";
import getGenshinAccount from "../controllers/enka/getGenshinAccount";

const router = Router();

router.get("/uid/:uid", getGenshinAccount);

export default router;
