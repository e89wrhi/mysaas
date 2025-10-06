/*import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { siteConfig } from '@/config/marketing';
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Wajo', 'Delivery', 'Logistics', 'Package'],
  authors: [
    {
      name: 'wajo',
      url: 'https://wajo.com',
    },
  ],
  creator: 'wajo',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@wajo',
  },
  icons: {
    icon: '/box.png',
    shortcut: '/box.png',
    apple: '/box.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //useEffect(() => {
  // initialise app session
  // initializeSession();
  //})

  const locale = await getLocale();
  return (
    <html suppressHydrationWarning lang={locale}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistMono.variable,
          geistSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
*/
import '@/styles/globals.css';

import { fontGeist, fontHeading, fontSans, fontUrban } from '@/assets/fonts';
import { SessionProvider } from '@/lib/auth-client';
import { ThemeProvider } from 'next-themes';

import { cn, constructMetadata } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@/components/analytics';
import ModalProvider from '@/components/modals/providers';
import { NextIntlClientProvider } from 'next-intl';
//import { TailwindIndicator } from '@/components/tailwind-indicator';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = constructMetadata();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontUrban.variable,
          fontHeading.variable,
          fontGeist.variable
        )}
      >
        <SessionProvider>
          <NextIntlClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <ModalProvider>{children}</ModalProvider>
              <Analytics />
              <Toaster richColors closeButton />
              {/*<TailwindIndicator />*/}
            </ThemeProvider>
          </NextIntlClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
