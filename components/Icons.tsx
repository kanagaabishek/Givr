"use client";
import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  stroke?: number;
}

const Icon: React.FC<IconProps> = ({ name, size = 22, stroke = 1.7, ...rest }) => {
  const s = {
    width: size,
    height: size,
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };

  const paths: Record<string, React.ReactNode> = {
    home: <><path d="M3 11l9-7 9 7" /><path d="M5 10v10h14V10" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
    heart: <path d="M12 20s-7-4.35-7-10a4 4 0 017-2.65A4 4 0 0119 10c0 5.65-7 10-7 10z" />,
    sparkle: <><path d="M12 3v6M12 15v6M3 12h6M15 12h6" /><path d="M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></>,
    filter: <path d="M4 5h16M7 12h10M10 19h4" />,
    arrowRight: <><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></>,
    arrowLeft: <><path d="M19 12H5" /><path d="M11 18l-6-6 6-6" /></>,
    chevronRight: <path d="M9 6l6 6-6 6" />,
    chevronLeft: <path d="M15 6l-6 6 6 6" />,
    chevronDown: <path d="M6 9l6 6 6-6" />,
    close: <><path d="M6 6l12 12" /><path d="M18 6l-12 12" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    check: <path d="M5 12l5 5 9-11" />,
    share: <><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="M8.2 11l7.6-4M8.2 13l7.6 4" /></>,
    bookmark: <path d="M6 4h12v17l-6-4-6 4z" />,
    bell: <><path d="M6 16V11a6 6 0 0112 0v5l1.5 2H4.5z" /><path d="M10 21a2 2 0 004 0" /></>,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5" /></>,
    moon: <path d="M20 14a8 8 0 11-10-10 6 6 0 0010 10z" />,
    book: <path d="M4 4h7a3 3 0 013 3v13a2 2 0 00-2-2H4zM20 4h-7a3 3 0 00-3 3v13a2 2 0 012-2h8z" />,
    leaf: <><path d="M5 19c0-7 6-13 14-13 0 8-6 14-14 14z" /><path d="M5 19c4-4 7-7 14-13" /></>,
    droplet: <path d="M12 3s6 7 6 11a6 6 0 11-12 0c0-4 6-11 6-11z" />,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a14 14 0 010 18M12 3a14 14 0 000 18" /></>,
    users: <><circle cx="9" cy="8" r="3.5" /><path d="M2 20c0-3 3-5 7-5s7 2 7 5" /><circle cx="17" cy="9" r="3" /><path d="M22 19c0-2.5-2-4-5-4" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    pin: <><path d="M12 21s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z" /><circle cx="12" cy="8" r="2.5" /></>,
    card: <><rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 10h18" /></>,
    lock: <><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" /></>,
    apple: <path d="M16 13a4 4 0 002 3.5c-.6 1.5-1.5 3-3 3-1 0-1.6-.5-3-.5s-2 .5-3 .5c-2 0-4-3.5-4-7s2-6 4.5-6c1.2 0 2 .5 2.5.5S13.3 6 14.5 6c1 0 2 .5 2.5 1.5-1.5.7-1.8 2.7-1 3.7zM14 4c-.5 1-1.5 2-2.5 2 0-1 1-2.5 2.5-2.5z" />,
    spark: <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 17l.8 1.7 1.7.8-1.7.8L19 22l-.8-1.7L16.5 19.5l1.7-.8z" /></>,
    star: <path d="M12 3l2.7 5.7 6.3.6-4.7 4.3 1.4 6.4L12 17l-5.7 3 1.4-6.4L3 9.3l6.3-.6z" />,
    quote: <path d="M7 7h4v4H7v3a3 3 0 003 3M14 7h4v4h-4v3a3 3 0 003 3" />,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.5" /></>,
    handshake: <path d="M3 12l3-3 4 1 3-2 4 2 4-1 0 7-3 1-2 2-4-1-2 2-4-2-3 1z" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8v.01" /></>,
    wifi: <path d="M2 8a16 16 0 0120 0M5 12a11 11 0 0114 0M8 16a6 6 0 018 0M12 20v.01" />,
    battery: <><rect x="3" y="8" width="16" height="8" rx="1.5" /><rect x="5" y="10" width="11" height="4" rx="0.5" fill="currentColor" stroke="none" /><rect x="20" y="10" width="2" height="4" rx="0.5" fill="currentColor" stroke="none" /></>,
    signal: <><rect x="3" y="14" width="3" height="6" rx="0.5" fill="currentColor" stroke="none" /><rect x="9" y="11" width="3" height="9" rx="0.5" fill="currentColor" stroke="none" /><rect x="15" y="7" width="3" height="13" rx="0.5" fill="currentColor" stroke="none" /></>,
    cross: <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />,
    flag: <><path d="M5 21V4M5 4h11l-2 4 2 4H5" /></>,
  };

  return <svg {...s} {...rest}>{paths[name] ?? null}</svg>;
};

export default Icon;
