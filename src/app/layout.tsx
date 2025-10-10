import '@/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { ClerkProvider } from '@clerk/nextjs';
import { cn, constructMetadata } from '@/lib/utils';
import { Toaster } from '@/components/ui/sonner';
import { Analytics } from '@/components/analytics';
import ModalProvider from '@/components/modals/providers';
import { NextIntlClientProvider } from 'next-intl';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = constructMetadata();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn('min-h-screen bg-background font-sans antialiased')}
        >
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
        </body>
      </html>
    </ClerkProvider>
  );
}
