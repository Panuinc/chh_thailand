import UILogoutProvider from "@/components/logout/logoutProvider";
export default function PagesLayout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();

  const handleManualLogout = async () => {
    try {
      if (session?.user?.id) {
        await logUserLogout({
          userId: parseInt(session.user.id),
          username: session.user.nameTH,
          ipAddress: null,
          userAgent: navigator.userAgent,
        });
      }
    } catch (err) {
    } finally {
      await signOut({ callbackUrl: "/" });
    }
  };

  const sidebarItems = getSidebarItems(handleManualLogout);

  useEffect(() => {
    if (session?.expires) {
      const expiry = new Date(session.expires).getTime();
      const now = Date.now();
      if (now > expiry) {
        signOut({ callbackUrl: "/" });
      }
    }
  }, [session]);

  if (status === "loading") return <Loading />;
  if (!session) {
    signOut({ callbackUrl: "/" });
    return null;
  }

  return (
    <UILogoutProvider>
      <div className="flex flex-col items-center justify-center w-full h-full gap-2">
        <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
        {isMobileMenuOpen && (
          <MobileSidebar
            sidebarItems={sidebarItems}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
        <div className="flex flex-row items-center justify-start w-full h-full p-2 gap-2 overflow-auto">
          <Sidebar sidebarItems={sidebarItems} />
          <Content>{children}</Content>
        </div>
      </div>
    </UILogoutProvider>
  );
}
