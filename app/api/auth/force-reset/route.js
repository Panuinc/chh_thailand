import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { userId, newPassword } = await req.json();

    if (!userId || !newPassword) {
      return Response.json({ message: "Missing parameters." }, { status: 400 });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    await prisma.userAuth.update({
      where: { userAuthUserId: parseInt(userId) },
      data: {
        userAuthPassword: hash,
        userAuthForceReset: false,
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }
}
