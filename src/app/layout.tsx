import type { Metadata, Viewport } from "next";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { DemoProvider } from "@/context/DemoContext";
import { LanguageProvider } from "@/context/LanguageContext";

import { Header } from "@/components/layout/Header";
import { AppShell } from "@/components/layout/AppShell";
import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export const metadata: Metadata = {
  title: "CareConnect | Post-Discharge Safety & Recovery Companion",
  description:
    "Post-discharge safety companion bridging prescription medications with traditional herbal remedies.",
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg' },
      { url: '/logo.svg', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/icon.png',
  },
};


export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="
          min-h-screen
          bg-slate-50
          text-slate-900
          antialiased
          transition-colors
          dark:bg-slate-900
          dark:text-slate-100
        "
      >
        <AuthProvider>
          <LanguageProvider>
            <DemoProvider>
              <Header />

              <DashboardSidebar />

              <AppShell>{children}</AppShell>

              <MobileNav />
            </DemoProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}