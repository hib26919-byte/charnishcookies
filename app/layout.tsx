import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chatbot/ChatWidget';
import { FloatingActions } from '@/components/layout/FloatingActions';
import { AnnouncementBar } from '@/components/layout/AnnouncementBar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://charnishcookies.com'),

  title: {
    default: 'Charnish Cookies | Premium Homemade Cookies in Bangalore',
    template: '%s | Charnish Cookies',
  },

  description:
    'Fresh homemade cookies, brownies, cakes, gift boxes, and custom bakery orders from Charnish Cookies in Bangalore.',

  keywords: [
    'Charnish Cookies',
    'Cookies Bangalore',
    'Homemade Cookies Bangalore',
    'Best Cookies Bangalore',
    'Fresh Cookies Bangalore',
    'Brownies Bangalore',
    'Bakery Bangalore',
    'Custom Gift Boxes',
    'Chocolate Cookies',
    'Singasandra Cookies',
    'Premium Cookies Bangalore',
  ],

  authors: [{ name: 'Charnish Cookies' }],

  creator: 'Charnish Cookies',

  publisher: 'Charnish Cookies',

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: 'https://charnishcookies.com',
  },

  openGraph: {
    title: 'Charnish Cookies | Homemade Cookies in Bangalore',

    description:
      'Fresh homemade cookies baked with love in Bangalore. Order premium cookies, brownies, cakes, and bakery gift boxes.',

    url: 'https://charnishcookies.com',

    siteName: 'Charnish Cookies',

    locale: 'en_IN',

    type: 'website',

    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Charnish Cookies Logo',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title: 'Charnish Cookies',

    description:
      'Premium homemade cookies and brownies in Bangalore.',

    images: ['/logo.png'],
  },

  icons: {
    icon: [
      { url: '/logo.png', type: 'image/png', sizes: '512x512' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#6B2F0A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <body className="font-sans bg-white text-black">
        
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',

              '@type': 'Bakery',

              name: 'Charnish Cookies',

              image: 'https://charnishcookies.com/logo.png',

              logo: 'https://charnishcookies.com/logo.png',

              url: 'https://charnishcookies.com',

              telephone: '+91 7676818313',

              additionalProperty: {
                '@type': 'PropertyValue',
                name: 'Alternate Contact',
                value: '+91 8978169099',
              },

              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bangalore',
                addressRegion: 'Karnataka',
                addressCountry: 'India',
              },

              areaServed: {
                '@type': 'City',
                name: 'Bangalore',
              },

              description:
                'Fresh homemade cookies, brownies, cakes, and bakery gift boxes in Bangalore.',

              sameAs: [
                'https://www.instagram.com/charnishcookies/',
              ],
            }),
          }}
        />

        <Providers>
          <AnnouncementBar />
          <Navbar />

          <main>{children}</main>

          <Footer />

          <FloatingActions />

          <ChatWidget />

          <MobileNav />
        </Providers>
      </body>
    </html>
  );
}
