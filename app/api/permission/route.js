import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET  =>  ดึงสิทธิ์ทั้งหมด (ใช้ใน UI)
export async function GET() {
  const permissions = await prisma.menuPermission.findMany({
    include: { menu: true, role: true, division: true },
    orderBy: [{ roleId: "asc" }, { divisionId: "asc" }, { menu: { menuOrder: "asc" } }],
  });
  return NextResponse.json({ permissions });
}

// POST => upsert 1 แถว {menuId, roleId, divisionId, canRead, canWrite}
export async function POST(req) {
  const { menuId, roleId, divisionId, canRead, canWrite } = await req.json();

  const permission = await prisma.menuPermission.upsert({
    where: { menuId_roleId_divisionId: { menuId, roleId, divisionId } },
    update: { canRead, canWrite },
    create: { menuId, roleId, divisionId, canRead, canWrite },
  });

  return NextResponse.json({ permission });
}
