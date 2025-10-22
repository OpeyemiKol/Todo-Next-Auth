import prisma from "../lib/prisma";

async function test() {
  try {
    const users = await prisma.user.findMany();
    console.log("Users in DB:", users);
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

test();
