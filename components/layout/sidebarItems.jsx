import {
  LayoutDashboard,
  User,
  Computer,
  Warehouse,
  Settings,
  Key,
  Logs,
  Workflow,
} from "lucide-react";

export function getSidebarItems(handleManualLogout) {
  return [
    {
      icon: Workflow,
      label: "Cloud",
      href: ["https://chhindustry.sg3.quickconnect.to/#/signin"],
    },
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
      icon: Logs,
      label: "Logs",
      href: ["/logs"],
    },
    {
      icon: Key,
      label: "Sign Out",
      onClick: handleManualLogout,
    },
  ];
}
