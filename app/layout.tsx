
import './globals.css';
import type { Metadata } from 'next';

const siteUrl = 'https://sptvinstaller.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      'TV Mounting Toronto, GTA & Kitchener | SP TV Installer',
    template: '%s | SP TV Installer',
  },

  description:
    'Professional TV mounting in Toronto, the GTA, Kitchener, Waterloo, Cambridge and Greater Houston. Fireplace mounting, full-motion brackets and home theatres. Request an appointment online.',

  applicationName: 'SP TV Installer',

  keywords: [
    'TV mounting Toronto',
    'TV installation Toronto',
    'TV mounting GTA',
    'TV mounting Kitchener',
    'TV mounting Waterloo',
    'TV mounting Cambridge',
    'TV mounting Mississauga',
    'TV mounting Brampton',
    'TV installation near me',
    'TV wall mounting',
    'fireplace TV mounting',
    'full motion TV mount installation',
    'TV mounting Houston',
    'TV mounts for sale',
    'home theatre installation',
  ],

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'SP TV Installer',
    title:
      'SP TV Installer | Professional TV Mounting & Installation',
    description:
      'Professional TV mounting in Toronto, the GTA, Waterloo Region and Greater Houston. Serving customers since 2015. Request an appointment with no upfront payment.',
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SP TV Installer | Professional TV Mounting',
    description:
      'TV wall mounting, fireplace installation and home theatre services in Toronto, the GTA, Waterloo Region and Houston.',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
