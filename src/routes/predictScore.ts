import { Router } from "express";
import PredictScore from "../controllers/predictScore";
const router = Router();

router.post('/predictScore', PredictScore)

export default router;