import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import DeviceShell from "@/components/DeviceShell";

export const metadata: Metadata = {
  title: "Givr — Small gifts. Big, traceable change.",
  description: "Connect to vetted nonprofits in 41 countries and track every dollar.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="app-stage">
            <DeviceShell>
              {children}
            </DeviceShell>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
