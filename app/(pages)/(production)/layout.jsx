import SideBarSection from "@/components/layout/SideBarSection";

export default function ProductionLayout({ children }) {
  return <SideBarSection sectionKey="production">{children}</SideBarSection>;
}
