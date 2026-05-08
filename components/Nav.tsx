"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Icon from "./Icons";
import { useTheme } from "./ThemeProvider";

export const StatusBar = () => {
  const [time, setTime] = useState(() => {
    const d = new Date();
    return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false });
  });

  useEffect(() => {
    const i = setInterval(() => {
      const d = new Date();
      setTime(d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: false }));
    }, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="statusbar">
      <span>{time}</span>
      <div className="statusbar__notch" />
      <div className="statusbar__icons">
        <Icon name="signal" size={14} stroke={1.5} />
        <Icon name="wifi" size={14} stroke={1.5} />
        <Icon name="battery" size={20} stroke={1.5} />
      </div>
    </div>
  );
};

export const TopNav = ({ page }: { page: string }) => {
  const router = useRouter();
  const { dark, toggleDark } = useTheme();

  return (
    <div className="topnav">
      <button className="topnav__brand" onClick={() => router.push("/")} style={{ background: "none", border: "none", padding: 0 }}>
        <span className="topnav__logo">G</span>
        <span>Givr</span>
      </button>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="topnav__icon-btn" onClick={toggleDark} aria-label="Toggle theme">
          <Icon name={dark ? "sun" : "moon"} size={16} />
        </button>
        <button className="topnav__cta" onClick={() => router.push("/donate")}>
          Donate
          <Icon name="heart" size={13} stroke={2.2} />
        </button>
      </div>
    </div>
  );
};

export const TabBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    { id: "/", label: "Home", icon: "home" },
    { id: "/programs", label: "Programs", icon: "grid" },
    { id: "/donate", label: "Give", icon: "heart", primary: true },
    { id: "/impact", label: "Impact", icon: "sparkle" },
    { id: "/impact", label: "About", icon: "user" },
  ];

  const isActive = (id: string) => {
    if (id === "/") return pathname === "/";
    return pathname.startsWith(id);
  };

  return (
    <div className="tabbar">
      {tabs.map((t, i) => (
        <button
          key={i}
          className={`tab ${isActive(t.id) && (i < 4 || pathname.startsWith("/impact")) ? "is-active" : ""} ${t.primary ? "tab--donate" : ""}`}
          onClick={() => router.push(t.id)}
        >
          <span className="tab__bubble">
            <Icon name={t.icon} size={t.primary ? 22 : 19} stroke={1.9} />
          </span>
          {!t.primary && <span>{t.label}</span>}
          {t.primary && <span style={{ color: "var(--accent)" }}>{t.label}</span>}
        </button>
      ))}
    </div>
  );
};
