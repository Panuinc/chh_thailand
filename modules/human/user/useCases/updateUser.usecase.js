import { userPutSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { getLocalNow } from "@/lib/getLocalNow";
import { saveUploadedFile } from "@/lib/fileStore";

export async function UpdateUserUseCase(data) {
  const parsed = userPutSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const { userId, userPicture, userFirstName } = parsed.data;

  const existing = await UserService.getById(userId);
  if (!existing) {
    throw { status: 404, message: "User not found" };
  }

  const now = getLocalNow();
  const normalizedName = userFirstName.trim().toLowerCase();

  let updatedPicture = existing.userPicture;
  if (userPicture && typeof userPicture.name === "string") {
    updatedPicture = await saveUploadedFile(
      userPicture,
      "user",
      normalizedName
    );
  }

  return UserService.update(userId, {
    ...parsed.data,
    userPicture: updatedPicture,
    userFirstName: normalizedName,
    userUpdateAt: now,
  });
}
