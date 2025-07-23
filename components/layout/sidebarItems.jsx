import {
  LayoutDashboard,
  User,
  Computer,
  Warehouse,
  Settings,
  Key,
  Logs,
  Cloud,
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
      href: [
        "/warehouse",
        "/rfid-in",
        "/rfid-out",
        "/rm/stock",
        "/rm/inbound",
        "/rm/outbound",
        "/fg/stock",
        "/fg/inbound",
        "/fg/outbound",
        "/history",
        "/erp-status",
      ],
    },
    // {
    //   icon: Settings,
    //   label: "Setting",
    //   href: ["/setting"],
    // },
    {
      icon: Logs,
      label: "Logs",
      href: ["/logs"],
    },
    {
      icon: Cloud,
      label: "Cloud",
      href: [
        "https://192-168-1-100.chhindustry.direct.quickconnect.to:7001/#/signin",
      ],
    },
    {
      icon: Key,
      label: "Sign Out",
      onClick: handleManualLogout,
    },
  ];
}
