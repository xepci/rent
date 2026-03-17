import dotenv from "dotenv";
dotenv.config();
function requireEnv(name: string): string { const value = process.env[name]; if (!value) throw new Error(`Missing required environment variable: ${name}`); return value; }
export const env = {
  PORT: Number(process.env.PORT || 5000),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:8080",
  EMAIL_HOST: process.env.EMAIL_HOST || "",
  EMAIL_PORT: Number(process.env.EMAIL_PORT || 587),
  EMAIL_USER: process.env.EMAIL_USER || "",
  EMAIL_PASS: process.env.EMAIL_PASS || "",
  EMAIL_FROM: process.env.EMAIL_FROM || process.env.EMAIL_USER || "",
  ADMIN_NOTIFICATION_EMAIL: process.env.ADMIN_NOTIFICATION_EMAIL || process.env.EMAIL_USER || "",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || ""
};
