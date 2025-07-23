import { PrismaClient } from "@prisma/client";
import { sendResetEmail } from "@/lib/mail/sendResetEmail";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function POST(req) {
  const { email } = await req.json();

  const auth = await prisma.userAuth.findFirst({
    where: { userAuthUsername: email },
  });

  if (!auth) {
    return Response.json({ message: "Email not found." }, { status: 404 });
  }

  const token = randomUUID();
  const expire = new Date(Date.now() + 15 * 60 * 1000);

  await prisma.userAuth.update({
    where: { userAuthId: auth.userAuthId },
    data: {
      userAuthResetToken: token,
      userAuthResetExpire: expire,
    },
  });

  const link = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;
  await sendResetEmail(email, link);

  return Response.json({ message: "Reset email sent." });
}
