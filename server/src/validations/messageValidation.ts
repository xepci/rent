import { z } from "zod";

export const replyMessageSchema = z.object({
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(2, "Reply message is required"),
});