-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "isReplied" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "repliedAt" TIMESTAMP(3);
