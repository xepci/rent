import { Router } from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
const router = Router();
router.use(protectAdmin);
router.get("/", getDashboardStats);
export default router;
