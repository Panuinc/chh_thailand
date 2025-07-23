import { PrismaClient } from "@prisma/client";
import { menuList } from "../lib/menuList.js";

const prisma = new PrismaClient();

async function main() {
  const flatMenus = menuList.flatMap((group) =>
    group.items.map((item, order) => ({
      menuCode: item.menuCode,
      menuName: item.menuName,
      menuGroup: group.groupCode,
      menuHref: item.href,
      menuOrder: order + 1,
    }))
  );

  for (const m of flatMenus) {
    await prisma.menu.upsert({
      where: { menuCode: m.menuCode },
      update: {},
      create: m,
    });
  }

  console.log(`✅ Seeded ${flatMenus.length} menus`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
