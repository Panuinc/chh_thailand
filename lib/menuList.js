export const menuList = [
  {
    groupCode: "overview",
    groupName: "Over View",
    icon: "LayoutDashboard",
    items: [{ menuCode: "overview", menuName: "Dashboard", href: "/overview" }],
  },
  {
    groupCode: "human",
    groupName: "Human",
    icon: "User",
    items: [
      { menuCode: "human", menuName: "Human", href: "/human" },
      { menuCode: "role", menuName: "Role", href: "/role" },
      { menuCode: "division", menuName: "Division", href: "/division" },
      { menuCode: "department", menuName: "Department", href: "/department" },
      { menuCode: "position", menuName: "Position", href: "/position" },
      { menuCode: "user", menuName: "User", href: "/user" },
    ],
  },
  {
    groupCode: "production",
    groupName: "Production",
    icon: "Factory",
    items: [
      { menuCode: "production", menuName: "Production", href: "/production" },
      {
        menuCode: "door",
        menuName: "Door",
        href: "/door",
      },
    ],
  },
  {
    groupCode: "sale",
    groupName: "Sale",
    icon: "BadgeDollarSign",
    items: [
      { menuCode: "sale", menuName: "Sale", href: "/sale" },
      { menuCode: "customer", menuName: "Customer", href: "/customer" },
    ],
  },
  {
    groupCode: "technology",
    groupName: "Technology",
    icon: "Computer",
    items: [
      { menuCode: "technology", menuName: "Technology", href: "/technology" },
    ],
  },
  {
    groupCode: "warehouse",
    groupName: "Warehouse",
    icon: "Warehouse",
    items: [
      { menuCode: "warehouse", menuName: "Warehouse", href: "/warehouse" },
      { menuCode: "rfid-in", menuName: "RFID In", href: "/rfid-in" },
      { menuCode: "rfid-out", menuName: "RFID Out", href: "/rfid-out" },
      { menuCode: "rm-stock", menuName: "RM Stock", href: "/rm/stock" },
      { menuCode: "rm-inbound", menuName: "RM Inbound", href: "/rm/inbound" },
      {
        menuCode: "rm-outbound",
        menuName: "RM Outbound",
        href: "/rm/outbound",
      },
      { menuCode: "fg-stock", menuName: "FG Stock", href: "/fg/stock" },
      { menuCode: "fg-inbound", menuName: "FG Inbound", href: "/fg/inbound" },
      {
        menuCode: "fg-outbound",
        menuName: "FG Outbound",
        href: "/fg/outbound",
      },
      { menuCode: "history", menuName: "History", href: "/history" },
      { menuCode: "erp-status", menuName: "ERP Status", href: "/erp-status" },
    ],
  },
  {
    groupCode: "setting",
    groupName: "Setting",
    icon: "Settings",
    items: [{ menuCode: "setting", menuName: "Setting", href: "/setting" }],
  },
  {
    groupCode: "logs",
    groupName: "Logs",
    icon: "Logs",
    items: [{ menuCode: "logs", menuName: "Login Logs", href: "/logs" }],
  },
  {
    groupCode: "cloud",
    groupName: "Cloud",
    icon: "Cloud",
    items: [
      {
        menuCode: "cloud",
        menuName: "Cloud Access",
        href: "https://192-168-1-100.chhindustry.direct.quickconnect.to:7001/#/signin",
      },
    ],
  },
];
