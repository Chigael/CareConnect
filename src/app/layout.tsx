import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DemoProvider } from '@/context/DemoContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'CareConnect | Post-Discharge Safety & Recovery Companion',
  description: 'Post-discharge safety companion bridging prescription medications with traditional herbal remedies.',
  icons: {
    icon: '/CareConnect Logo.png',
    shortcut: '/CareConnect Logo.png',
    apple: '/CareConnect Logo.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
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
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans antialiased transition-colors">
        <AuthProvider>
          <LanguageProvider>
            <DemoProvider>
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <MobileNav />
            </DemoProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

