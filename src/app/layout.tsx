import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DemoProvider } from '@/context/DemoContext';
import { Header } from '@/components/layout/Header';
import { MobileNav } from '@/components/layout/MobileNav';
import { DisclaimerBanner } from '@/components/common/DisclaimerBanner';
import { FlowStepper } from '@/components/common/FlowStepper';

export const metadata: Metadata = {
  title: 'CareConnect | Post-Discharge Safety & Recovery Companion',
  description: 'Post-discharge safety companion bridging prescription medications with traditional herbal remedies.',
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
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans antialiased">
        <AuthProvider>
          <DemoProvider>
            <DisclaimerBanner />
            <Header />
            <FlowStepper />
            <main className="flex-1">
              {children}
            </main>
            <MobileNav />
          </DemoProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
