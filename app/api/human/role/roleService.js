import prisma from "@/lib/prisma";
import logger from "@/lib/logger";

export class RoleService {
  static async getAllRolePaginated(skip = 0, take = 10) {
    logger.info({
      action: "getAllRolePaginated",
      message: "📥 Fetching all roles",
      skip,
      take,
    });

    return prisma.role.findMany({
      skip,
      take,
      orderBy: { roleCreateAt: "asc" },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    });
  }

  static async countAllRoles() {
    logger.info({
      action: "countAllRoles",
      message: "🔢 Counting total roles",
    });
    return prisma.role.count();
  }

  static async getRoleById(roleId) {
    logger.info({
      action: "getRoleById",
      message: "📥 Fetching role by ID",
      roleId,
    });

    return prisma.role.findUnique({
      where: { roleId },
      include: {
        createdBy: { select: { userFirstName: true, userLastName: true } },
        updatedBy: { select: { userFirstName: true, userLastName: true } },
      },
    });
  }

  static async getRoleByName(roleName) {
    const normalized = roleName.trim().toLowerCase();

    logger.info({
      action: "getRoleByName",
      message: "🔍 Checking duplicate role name",
      roleName: normalized,
    });

    return prisma.role.findFirst({
      where: { roleName: normalized },
    });
  }

  static async createRole(data) {
    logger.info({
      action: "createRole",
      message: "🆕 Creating role",
      roleName: data.roleName,
    });

    return prisma.role.create({ data });
  }

  static async updateRole(roleId, data) {
    logger.info({
      action: "updateRole",
      message: "✏️ Updating role",
      roleId,
      roleName: data.roleName,
    });

    return prisma.role.update({
      where: { roleId },
      data,
    });
  }
}
