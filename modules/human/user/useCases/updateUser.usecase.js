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

  const {
    userId,
    userFirstName,
    userLastName,
    userPhone,
    userEmail,
    userPicture,
    userUpdateBy,
    useJobDivisionId,
    useJobDepartmentId,
    useJobPositionId,
    useJobRoleId,
    useJobStartDate,
    useJobEndDate,
    useJobContractType,
    userStatus,
  } = parsed.data;

  const now = getLocalNow();

  const existing = await UserService.getById(userId);
  if (!existing) {
    throw { status: 404, message: "User not found" };
  }

  const normalizedFirstName = userFirstName.trim().toLowerCase();
  const normalizedEmail = userEmail.trim().toLowerCase();

  let updatedPicture = existing.userPicture;
  if (
    userPicture &&
    typeof userPicture === "object" &&
    typeof userPicture.name === "string" &&
    userPicture.size > 0
  ) {
    updatedPicture = await saveUploadedFile(
      userPicture,
      "user",
      normalizedFirstName
    );
  }

  const updatedUser = await UserService.update(userId, {
    userFirstName: normalizedFirstName,
    userLastName,
    userPhone,
    userEmail: normalizedEmail,
    userPicture: updatedPicture,
    userStatus,
    userUpdateBy,
    userUpdateAt: now,
  });

  const updatedJob = await UserService.updateJob(userId, {
    useJobDivisionId,
    useJobDepartmentId,
    useJobPositionId,
    useJobRoleId,
    useJobStartDate,
    useJobEndDate,
    useJobContractType,
    useJobIsActive: true,
    useJobUpdateBy: userUpdateBy,
    useJobUpdateAt: now,
  });

  return { user: updatedUser, job: updatedJob };
}
