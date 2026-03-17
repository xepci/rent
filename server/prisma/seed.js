import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("xepciadminsuper.123", 10);

  const existingAdmin = await prisma.admin.findUnique({
    where: { email: "admin@xepcirent.com" },
  });

  if (!existingAdmin) {
    await prisma.admin.create({
      data: {
        name: "Xepci Admin",
        email: "admin@xepcirent.com",
        password: hashedPassword,
      },
    });

    console.log("Admin user created");
  } else {
    await prisma.admin.update({
      where: { email: "admin@xepcirent.com" },
      data: { password: hashedPassword },
    });

    console.log("Admin password updated");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });