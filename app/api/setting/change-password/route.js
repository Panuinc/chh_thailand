import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserService } from "@/modules/human/user/services/user.service";
import { validateRequest } from "@/lib/validateRequest";

export async function POST(request) {
  let ip = "";
  try {
    ip = await validateRequest(request);
    const { userId, currentPassword, newPassword } = await request.json();

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 422 }
      );
    }

    const auth = await UserService.getAuthByUserId(userId);
    if (!auth) {
      return NextResponse.json(
        { message: "User auth not found" },
        { status: 404 }
      );
    }

    const match = await bcrypt.compare(currentPassword, auth.userAuthPassword);
    if (!match) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 403 }
      );
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await UserService.updateAuthPassword(userId, hashed);

    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to change password" },
      { status: 500 }
    );
  }
}
