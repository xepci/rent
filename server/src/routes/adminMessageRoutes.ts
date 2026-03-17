import { Router } from "express";
import {
  deleteMessage,
  getAdminMessages,
  replyToMessage,
} from "../controllers/contactController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { validateBody } from "../middlewares/validateMiddleware.js";
import { replyMessageSchema } from "../validations/messageValidation.js";

const router = Router();

router.use(protectAdmin);

router.get("/", getAdminMessages);
router.delete("/:id", deleteMessage);
router.post("/:id/reply", validateBody(replyMessageSchema), replyToMessage);

export default router;