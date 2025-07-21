import { userPostSchema } from "../schemas/user.schema";
import { UserService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";
import { getLocalNow } from "@/lib/getLocalNow";

export async function CreateUserUseCase(data) {
  const parsed = userPostSchema.safeParse(data);
  if (!parsed.success) {
    throw {
      status: 422,
      message: "Invalid input",
      details: parsed.error.flatten().fieldErrors,
    };
  }

  const normalizedName = parsed.data.userFirstName.trim().toLowerCase();
  const duplicate = await UserValidator.isDuplicateUserName(normalizedName);
  if (duplicate) {
    throw { status: 409, message: `User '${normalizedName}' already exists` };
  }

  return UserService.create({
    ...parsed.data,
    userFirstName: normalizedName,
    userCreateAt: getLocalNow(),
  });
}
