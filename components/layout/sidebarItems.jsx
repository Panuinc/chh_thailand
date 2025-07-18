import {
  LayoutDashboard,
  User,
  Computer,
  Warehouse,
  Settings,
  Key,
} from "lucide-react";

export function getSidebarItems(handleManualLogout) {
  return [
    {
      icon: LayoutDashboard,
      label: "Over View",
      href: ["/overview"],
    },
    {
      icon: User,
      label: "Human",
      href: [
        "/human",
        "/role",
        "/division",
        "/department",
        "/position",
        "/user",
      ],
    },
    {
      icon: Computer,
      label: "Technology",
      href: ["/technology"],
    },
    {
      icon: Warehouse,
      label: "Warehouse",
      href: ["/warehouse"],
    },
    {
      icon: Settings,
      label: "Setting",
      href: ["/setting"],
    },
    {
      icon: Key,
      label: "Sign Out",
      onClick: handleManualLogout,
    },
  ];
}
