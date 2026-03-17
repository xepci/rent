import { Router } from "express";
import { createBooking } from "../controllers/bookingController.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { publicFormLimiter } from "../middlewares/rateLimitMiddleware.js";
import { bookingSchema } from "../validations/bookingValidation.js";

const router = Router();

router.post("/", publicFormLimiter, validateBody(bookingSchema), createBooking);

export default router;