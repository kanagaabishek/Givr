"use client";
import { usePathname } from "next/navigation";
import { TabBar } from "./Nav";

export default function DeviceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showTabBar = !pathname.startsWith("/donate");

  return (
    <div className="device">
      <div className="device__viewport">
        {children}
      </div>
      {showTabBar && <TabBar />}
    </div>
  );
}
