import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/layout/Providers';
import { Navbar } from '@/components/layout/Navbar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Footer } from '@/components/layout/Footer';
import { ChatWidget } from '@/components/chatbot/ChatWidget';
import { FloatingActions } from '@/components/layout/FloatingActions';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://charnishcookies.com'),
  title: 'Charnish Cookies | Homemade Cookies in Bangalore',
  description: 'Fresh homemade cookies, gift boxes, and custom orders from Charnish Cookies in Singasandra, Bangalore.',
  openGraph: {
    title: 'Charnish Cookies',
    description: 'Fresh homemade cookies baked with care in Bangalore.',
    images: ['/og-image.png']
  },
  manifest: '/manifest.json'
};

export const viewport: Viewport = {
  themeColor: '#6B2F0A'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <Providers>
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
