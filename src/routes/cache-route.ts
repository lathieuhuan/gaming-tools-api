import { Router } from "express";
import updateCache from "../controllers/cache/updateCache";

const router = Router();

router.post("/update", updateCache);

export default router;
