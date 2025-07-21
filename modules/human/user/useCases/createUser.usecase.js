import bcrypt from "bcryptjs";
import { userPostSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";
import { getLocalNow } from "@/lib/getLocalNow";
import { saveUploadedFile } from "@/lib/fileStore";

export async function CreateUserUseCase(data) {
  const parsed = userPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const {
    userFirstName,
    userLastName,
    userPhone,
    userEmail,
    userPicture,
    userCreateBy,
    useJobDivisionId,
    useJobDepartmentId,
    useJobPositionId,
    useJobRoleId,
    useJobStartDate,
    useJobContractType,
  } = parsed.data;

  const normalizedFirstName = userFirstName.trim().toLowerCase();
  const normalizedEmail = userEmail.trim().toLowerCase();

  const duplicate = await UserValidator.isDuplicateUserEmail(normalizedEmail);
  if (duplicate) {
    throw {
      status: 409,
      message: `Email '${normalizedEmail}' already exists`,
    };
  }

  const now = getLocalNow();

  let savedPicturePath = "";
  if (userPicture && typeof userPicture.name === "string") {
    savedPicturePath = await saveUploadedFile(
      userPicture,
      "user",
      normalizedFirstName
    );
  }

  const user = await UserService.create({
    userFirstName: normalizedFirstName,
    userLastName,
    userPhone,
    userEmail: normalizedEmail,
    userPicture: savedPicturePath,
    userCreateBy,
    userCreateAt: now,
  });

  const hashedPassword = await bcrypt.hash("Chh_Thailand", 10);
  await UserService.createAuth({
    userAuthUserId: user.userId,
    userAuthUsername: user.userEmail,
    userAuthPassword: hashedPassword,
  });

  const job = await UserService.createJob({
    useJobUserId: user.userId,
    useJobDivisionId,
    useJobDepartmentId,
    useJobPositionId,
    useJobRoleId,
    useJobStartDate,
    useJobContractType,
    useJobIsCurrent: true,
    useJobCreateBy: userCreateBy,
    useJobCreateAt: now,
  });

  return { user, job };
}
