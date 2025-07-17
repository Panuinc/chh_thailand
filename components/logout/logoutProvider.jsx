"use client";

import { memo, useEffect } from "react";
import { signOut, getSession } from "next-auth/react";
import { useIdleTimer } from "react-idle-timer";
import { logUserLogout } from "@/lib/userLogger";

const UILogoutProvider = ({ children }) => {
  const timeout = 60 * 60 * 1000;

  const handleOnIdle = async () => {
    console.log("🛑 Idle timeout, logging out");
    try {
      const session = await getSession();
      if (session?.user?.id) {
        await logUserLogout({
          userId: parseInt(session.user.id),
          username: session.user.nameTH,
          ipAddress: null,
          userAgent: navigator.userAgent,
        });
      }
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("🔥 Logout error (idle):", error);
      await signOut({ callbackUrl: "/" });
    }
  };

  const handleOnActive = async () => {
    console.log("👋 User is active again");
    const session = await getSession();
    console.log("🔁 Session refreshed on activity:", session?.expires);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const session = await getSession();
      console.log("🔁 Session refreshed via interval:", session?.expires);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  return children;
};

export default memo(UILogoutProvider);
