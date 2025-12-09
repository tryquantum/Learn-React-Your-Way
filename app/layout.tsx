import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from 'next-themes';
import { cn } from '@/utils/cn';
import { Provider as TooltipProvider } from '@/components/ui/tooltip';
import { NotificationProvider } from '@/components/ui/notification-provider';
import { DevToolbarInit } from '@/components/dev-toolbar';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  title: 'Growtiva - AI Marketing Team for Solopreneurs',
  description:
    'Grow like a team of 5—without the payroll. Professional AI-powered content creation, social media automation, and email marketing for solopreneurs. Start free, no credit card required.',
  keywords: [
    'AI marketing',
    'solopreneur tools',
    'content creation',
    'social media automation',
    'AI copywriting',
    'email marketing automation',
    'marketing automation',
    'content marketing',
    'AI team',
    'solopreneur growth',
  ],
  authors: [{ name: 'Growtiva' }],
  creator: 'Growtiva',
  publisher: 'Growtiva',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://growtiva.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Growtiva - AI Marketing Team for Solopreneurs',
    description:
      'Grow like a team of 5—without the payroll. Professional AI-powered content creation, social media automation, and email marketing.',
    url: 'https://growtiva.com',
    siteName: 'Growtiva',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Growtiva - AI Marketing Team for Solopreneurs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Growtiva - AI Marketing Team for Solopreneurs',
    description:
      'Grow like a team of 5—without the payroll. Professional AI-powered content creation and marketing automation.',
    images: ['/twitter-image.png'],
    creator: '@growtiva',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={cn(GeistSans.variable, GeistMono.variable, 'antialiased')}
    >
      <body className='bg-bg-white-0 text-text-strong-950'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
          <TooltipProvider>
            <div className='flex min-h-screen flex-col'>
              <main className='flex flex-1 flex-col'>{children}</main>
            </div>
          </TooltipProvider>
        </ThemeProvider>
        <NotificationProvider />
        <DevToolbarInit />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
