import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(username: string, email: string, password: string) {
  const res = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  console.log(res);
}


