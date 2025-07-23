import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req) {
  const { token, newPassword } = await req.json();

  const auth = await prisma.userAuth.findFirst({
    where: {
      userAuthResetToken: token,
      userAuthResetExpire: { gt: new Date() },
    },
  });

  if (!auth) {
    return Response.json({ message: "Invalid or expired token." }, { status: 400 });
  }

  const hash = await bcrypt.hash(newPassword, 10);

  await prisma.userAuth.update({
    where: { userAuthId: auth.userAuthId },
    data: {
      userAuthPassword: hash,
      userAuthResetToken: null,
      userAuthResetExpire: null,
      userAuthForceReset: false,
    },
  });

  return Response.json({ message: "Password reset successful." });
}
