import { Router } from "express";
import { getAdminMe, loginAdmin } from "../controllers/adminAuthController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimitMiddleware.js";
const router = Router();
router.post("/login", authLimiter, loginAdmin);
router.get("/me", protectAdmin, getAdminMe);
export default router;
