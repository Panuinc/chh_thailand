import {
  LayoutDashboard,
  User,
  Warehouse,
  Logs,
  Cloud,
  Key,
  Settings,
  Computer,
} from "lucide-react";
import { menuList } from "@/lib/menuList";

const iconMap = {
  LayoutDashboard,
  User,
  Warehouse,
  Logs,
  Cloud,
  Key,
  Settings,
  Computer,
};

export function getSidebarItems(handleManualLogout) {
  const sidebarGroups = menuList.map((group) => ({
    icon: iconMap[group.icon] || User,
    label: group.groupName,
    href: group.items.map((item) => item.href),
    groupCode: group.groupCode,
  }));

  return [
    ...sidebarGroups,
    {
      icon: Key,
      label: "Sign Out",
      onClick: handleManualLogout,
    },
  ];
}
