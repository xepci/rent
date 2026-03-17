import { Router } from "express";
import {
  getAdminBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/bookingController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { bookingStatusSchema } from "../validations/bookingValidation.js";

const router = Router();

router.use(protectAdmin);

router.get("/", getAdminBookings);
router.get("/:id", getBookingById);
router.patch("/:id/status", validateBody(bookingStatusSchema), updateBookingStatus);
router.delete("/:id", deleteBooking);

export default router;