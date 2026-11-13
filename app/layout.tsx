
import './globals.css';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const siteUrl = 'https://sptvinstaller.com';

const googleMapsUrl =
  'https://www.google.com/maps/place/SP+TV+Installer/@43.3935798,-80.1972732,9z/data=!3m1!4b1!4m6!3m5!1s0x664e1f58bce3e97d:0x5204172022b22cb1!8m2!3d43.3935798!4d-80.1972732!16s%2Fg%2F11_07vtgdp';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: 'TV Mounting Mississauga, Toronto GTA & Kitchener | SP TV Installer',
    template: '%s | SP TV Installer',
  },

  description:
    'Professional TV mounting in Mississauga, Toronto, Brampton, Oakville, Kitchener, Waterloo, Cambridge and Greater Houston. Fireplace mounting, full-motion TV brackets and home theatre installation. Request an appointment online.',

  applicationName: 'SP TV Installer',

  keywords: [
    'TV mounting Mississauga',
    'TV installation Mississauga',
    'TV mounting Toronto',
    'TV installation Toronto',
    'TV mounting GTA',
    'TV mounting Brampton',
    'TV mounting Oakville',
    'TV mounting Kitchener',
    'TV mounting Waterloo',
    'TV mounting Cambridge',
    'TV mounting near me',
    'TV wall mounting',
    'fireplace TV mounting',
    'full motion TV mount installation',
    'TV mounting Houston',
    'home theatre installation',
    'TV mounts for sale',
  ],

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'SP TV Installer',
    title: 'SP TV Installer | Professional TV Mounting & Installation',
    description:
      'Professional TV wall mounting in Mississauga, Toronto, the GTA, Waterloo Region and Greater Houston. Serving customers since 2015. Request an appointment with no upfront payment.',
    locale: 'en_CA',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'SP TV Installer | Professional TV Mounting',
    description:
      'TV wall mounting, fireplace TV installation and home theatre services in Mississauga, Toronto GTA, Kitchener-Waterloo and Houston.',
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

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  '@id': `${siteUrl}/#business`,

  name: 'SP TV Installer',

  url: siteUrl,

  telephone: '+1-226-336-7339',

  email: 'info@sptvinstaller.com',

  description:
    'SP TV Installer provides professional TV wall mounting, full-motion TV mount installation, fireplace TV mounting, cable concealment, commercial TV installation and custom home theatre installation.',

  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mississauga',
    addressRegion: 'ON',
    addressCountry: 'CA',
  },

  areaServed: [
    'Mississauga',
    'Toronto',
    'Etobicoke',
    'Brampton',
    'Vaughan',
    'Markham',
    'Richmond Hill',
    'Oakville',
    'Burlington',
    'Milton',
    'Hamilton',
    'Guelph',
    'Cambridge',
    'Kitchener',
    'Waterloo',
    'Brantford',
    'Ajax',
    'Pickering',
    'Whitby',
    'Oshawa',
  ].map((city) => ({
    '@type': 'City',
    name: city,
  })),

  hasMap: googleMapsUrl,

  sameAs: [googleMapsUrl],

  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-226-336-7339',
    email: 'info@sptvinstaller.com',
    contactType: 'customer service',
    areaServed: 'CA',
    availableLanguage: 'English',
  },

  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'TV Mounting and Installation Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'TV Wall Mounting',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Standard TV Wall Mounting',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full-Motion TV Mount Installation',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Fireplace TV Mounting',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Large-Screen TV Installation',
            },
          },
        ],
      },
      {
        '@type': 'OfferCatalog',
        name: 'Additional Installation Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cable Concealment',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Home Theatre Installation',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Commercial TV Installation',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'TV Mount Supply and Installation',
            },
          },
        ],
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema).replace(
              /</g,
              '\\u003c'
            ),
          }}
        />
        {children}
      </body>
    </html>
  );
}
