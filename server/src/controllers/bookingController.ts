import { Request, Response } from "express";
import prisma from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { calculateRentalPrice } from "../utils/calculateRentalPrice.js";
import {
  sendBookingCustomerConfirmationEmail,
  sendBookingCancellationEmail,
  sendBookingNotificationEmail,
} from "../services/emailService.js";

function formatDateTime(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return {
    date: `${day}/${month}/${year}`,
    time: `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`,
  };
}

export const createBooking = asyncHandler(async (req: Request, res: Response) => {
  const {
    carId,
    customerName,
    customerEmail,
    customerPhone,
    pickupDate,
    dropoffDate,
    pickupLocation,
    dropoffLocation,
    notes,
  } = req.body;

  const car = await prisma.car.findUnique({
    where: { id: carId },
  });

  if (!car) {
    res.status(404).json({ message: "Selected car not found" });
    return;
  }

  if (!car.available) {
    res.status(400).json({ message: "This car is currently unavailable" });
    return;
  }

  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  if (Number.isNaN(pickup.getTime()) || Number.isNaN(dropoff.getTime())) {
    res.status(400).json({ message: "Invalid pickup or dropoff date" });
    return;
  }

  if (dropoff <= pickup) {
    res.status(400).json({ message: "Dropoff date must be after pickup date" });
    return;
  }

  const overlappingBooking = await prisma.booking.findFirst({
    where: {
      carId,
      status: { in: ["pending", "confirmed"] },
      AND: [
        { pickupDate: { lt: dropoff } },
        { dropoffDate: { gt: pickup } },
      ],
    },
  });

  if (overlappingBooking) {
    res.status(409).json({
      message: "This car is already booked for the selected dates",
    });
    return;
  }

  const totalPrice = calculateRentalPrice(pickup, dropoff, car.pricePerDay);

  const booking = await prisma.booking.create({
    data: {
      carId,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate: pickup,
      dropoffDate: dropoff,
      pickupLocation,
      dropoffLocation,
      notes: notes || null,
      totalPrice,
      status: "pending",
    },
    include: { car: true },
  });

  try {
    const pickupFormatted = formatDateTime(pickup);
    const dropoffFormatted = formatDateTime(dropoff);

    await sendBookingNotificationEmail({
      customerName,
      customerEmail,
      customerPhone,
      carName: car.name,
      pickupDate: pickupFormatted.date,
      pickupTime: pickupFormatted.time,
      dropoffDate: dropoffFormatted.date,
      dropoffTime: dropoffFormatted.time,
      pickupLocation,
      dropoffLocation,
      totalPrice,
      notes: notes || null,
    });
  } catch (error) {
    console.error("Booking notification email failed:", error);
  }

  res.status(201).json({
    message: "Booking created successfully",
    booking,
  });
});

export const getAdminBookings = asyncHandler(async (_req: Request, res: Response) => {
  const bookings = await prisma.booking.findMany({
    include: { car: true },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json(bookings);
});

export const getBookingById = asyncHandler(async (req: Request, res: Response) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
    include: { car: true },
  });

  if (!booking) {
    res.status(404).json({ message: "Booking not found" });
    return;
  }

  res.status(200).json(booking);
});

export const updateBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body as {
    status: "pending" | "confirmed" | "cancelled" | "completed";
  };

  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
    include: { car: true },
  });

  if (!booking) {
    res.status(404).json({ message: "Booking not found" });
    return;
  }

  if (status === "confirmed") {
    const overlappingConfirmedBooking = await prisma.booking.findFirst({
      where: {
        id: { not: req.params.id },
        carId: booking.carId,
        status: { in: ["pending", "confirmed"] },
        AND: [
          { pickupDate: { lt: booking.dropoffDate } },
          { dropoffDate: { gt: booking.pickupDate } },
        ],
      },
    });

    if (overlappingConfirmedBooking) {
      res.status(409).json({
        message:
          "Cannot confirm this booking because the car already has an overlapping booking",
      });
      return;
    }
  }

  const updatedBooking = await prisma.booking.update({
    where: { id: req.params.id },
    data: { status },
    include: { car: true },
  });

  try {
    if (status === "confirmed") {
      const pickupFormatted = formatDateTime(updatedBooking.pickupDate);
      const dropoffFormatted = formatDateTime(updatedBooking.dropoffDate);

      await sendBookingCustomerConfirmationEmail({
        customerEmail: updatedBooking.customerEmail,
        customerName: updatedBooking.customerName,
        carName: updatedBooking.car.name,
        pickupDate: pickupFormatted.date,
        pickupTime: pickupFormatted.time,
        dropoffDate: dropoffFormatted.date,
        dropoffTime: dropoffFormatted.time,
      });
    }

    if (status === "cancelled") {
      await sendBookingCancellationEmail({
        customerEmail: updatedBooking.customerEmail,
        customerName: updatedBooking.customerName,
        carName: updatedBooking.car.name,
      });
    }
  } catch (error) {
    console.error("Booking status email failed:", error);
  }

  res.status(200).json({
    message: "Booking status updated successfully",
    booking: updatedBooking,
  });
});

export const deleteBooking = asyncHandler(async (req: Request, res: Response) => {
  const booking = await prisma.booking.findUnique({
    where: { id: req.params.id },
  });

  if (!booking) {
    res.status(404).json({ message: "Booking not found" });
    return;
  }

  await prisma.booking.delete({
    where: { id: req.params.id },
  });

  res.status(200).json({
    message: "Booking deleted successfully",
  });
});