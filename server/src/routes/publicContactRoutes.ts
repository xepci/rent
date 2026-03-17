import { Router } from "express";
import { createContactMessage } from "../controllers/contactController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { publicFormLimiter } from "../middlewares/rateLimitMiddleware.js";
import { contactSchema } from "../validations/contactValidation.js";
const router = Router();
router.post("/", publicFormLimiter, validateBody(contactSchema), createContactMessage);
export default router;
