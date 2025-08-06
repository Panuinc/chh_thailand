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
    groupCode: "purchase",
    groupName: "Purchase",
    icon: "ShoppingCart",
    items: [
      { menuCode: "purchase", menuName: "Purchase", href: "/purchase" },
      { menuCode: "partner", menuName: "Partner", href: "/partner" },
      { menuCode: "pr", menuName: "PR", href: "/pr" },
      { menuCode: "po", menuName: "PO", href: "/po" },
    ],
  },
  {
    groupCode: "production",
    groupName: "Production",
    icon: "Factory",
    items: [
      { menuCode: "production", menuName: "Production", href: "/production" },
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
  // {
  //   groupCode: "technology",
  //   groupName: "Technology",
  //   icon: "Computer",
  //   items: [
  //     { menuCode: "technology", menuName: "Technology", href: "/technology" },
  //   ],
  // },
  {
    groupCode: "warehouse",
    groupName: "Warehouse",
    icon: "Warehouse",
    items: [
      { menuCode: "warehouse", menuName: "Ware House", href: "/warehouse" },
      { menuCode: "store", menuName: "Store", href: "/store" },
      { menuCode: "zone", menuName: "Zone", href: "/zone" },
      { menuCode: "aisle", menuName: "Aisle", href: "/aisle" },
      { menuCode: "rack", menuName: "Rack", href: "/rack" },
      { menuCode: "level", menuName: "Level", href: "/level" },
      { menuCode: "bin", menuName: "Bin", href: "/bin" },
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
