import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  sendAdminReplyEmail,
  sendContactNotificationEmail,
} from "../services/emailService.js";

export const createContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, phone, subject, message } = req.body;

  const savedMessage = await prisma.contactMessage.create({
    data: {
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    },
  });

  try {
    await sendContactNotificationEmail({
      name,
      email,
      phone: phone || null,
      subject: subject || null,
      message,
    });
  } catch (error) {
    console.error("Contact email sending failed:", error);
  }

  res.status(201).json({
    message: "Message sent successfully",
    contactMessage: savedMessage,
  });
});

export const getAdminMessages = asyncHandler(async (_req: Request, res: Response) => {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(messages);
});

export const deleteMessage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingMessage = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!existingMessage) {
    res.status(404).json({ message: "Message not found" });
    return;
  }

  await prisma.contactMessage.delete({
    where: { id },
  });

  res.status(200).json({
    message: "Message deleted successfully",
  });
});

export const replyToMessage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { subject, message } = req.body as {
    subject: string;
    message: string;
  };

  const existingMessage = await prisma.contactMessage.findUnique({
    where: { id },
  });

  if (!existingMessage) {
    res.status(404).json({ message: "Message not found" });
    return;
  }

  await sendAdminReplyEmail({
    to: existingMessage.email,
    customerName: existingMessage.name,
    subject,
    message,
  });

  await prisma.contactMessage.update({
    where: { id },
    data: {
      isReplied: true,
      repliedAt: new Date(),
    },
  });

  res.status(200).json({
    message: "Reply sent successfully",
  });
});