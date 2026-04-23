import type { Metadata, Viewport } from 'next'
import { Outfit, Sora } from 'next/font/google'

import { Providers } from '@/components/providers/providers'
import { PageTracking } from '@/lib/analytics/page-tracking'

import './globals.css'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? 'https://kujuatime.com'),
  title: {
    template: '%s | Kujua Time',
    default: 'Kujua Time – Scheduling, Payments & Client Management',
  },
  description:
    'Branded appointment scheduling for freelancers, service businesses, practitioners, and growing teams. Book appointments, collect payments, and manage clients from one platform.',
  keywords: [
    'appointment scheduling',
    'booking software',
    'client management',
    'online payments',
    'Paystack scheduling',
    'service business software',
    'coaching scheduling',
    'therapy scheduling',
    'Africa scheduling software',
  ],
  authors: [{ name: 'Kujua Time', url: 'https://kujuatime.com' }],
  creator: 'Kujua Time',
  publisher: 'Kujua Time',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kujuatime.com',
    siteName: 'Kujua Time',
    title: 'Kujua Time – Scheduling, Payments & Client Management',
    description:
      'Book the appointment, collect the payment, create the client record, and run the reminders automatically.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Kujua Time – Scheduling & Client Management Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kujua Time – Scheduling, Payments & Client Management',
    description:
      'Book the appointment, collect the payment, create the client record, and run the reminders automatically.',
    images: ['/og-default.png'],
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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: '/favicon-32x32.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0D4E5C' },
    { media: '(prefers-color-scheme: dark)', color: '#0D4E5C' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${outfit.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <Providers>
          <PageTracking />
          {children}
        </Providers>
      </body>
    </html>
  )
}
