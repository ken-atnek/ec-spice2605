/* =======================================
 *熊日すぱいす Layout
 * URL:src/app/layout.tsx
 * Created: 2026-04-04
 * Last updated: 2026-05-28
 * ======================================= */

import type { Metadata } from 'next';
import Script from 'next/script';
import '@/styles/globals.scss';
import SvgDefs from '@/components/SvgDefs';
import { isRealProduction } from '@/lib/env';
import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  Cormorant_Unicase,
} from 'next/font/google';

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jp-sans',
  display: 'swap',
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jp-serif',
  display: 'swap',
});

const cormorantUnicase = Cormorant_Unicase({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
});

// 本番のみ metadataBase を設定
const metadataBase = isRealProduction
  ? new URL(
      process.env.NEXT_PUBLIC_METADATA_BASE || 'https://yuuken-kumamoto.jp/'
    )
  : undefined;

export const metadata: Metadata = {
  title: 'よかモノがたり｜熊日すぱいす',
  description:
    '作り手のストーリーや、作品・商品に込めた思いを届ける「よかモノがたり」。熊日すぱいすが熊本の本当の魅力を取材して紹介します。',
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      title: 'よかモノがたり｜熊日すぱいす',
      description:
        '作り手のストーリーや、作品・商品に込めた思いを届ける「よかモノがたり」。熊日すぱいすが熊本の本当の魅力を取材して紹介します。',
      siteName: '熊日すぱいす',
      url: metadataBase?.toString(),
      type: 'website',
      images: [
        {
          url: '/ogp.jpg',
          width: 1200,
          height: 630,
          alt: '熊日すぱいすのOGP画像',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'よかモノがたり｜熊日すぱいす',
      description:
        '作り手のストーリーや、作品・商品に込めた思いを届ける「よかモノがたり」。熊日すぱいすが熊本の本当の魅力を取材して紹介します。',
      images: ['/ogp.jpg'],
    },
  }),
  robots: isRealProduction ? 'index, follow' : 'noindex, nofollow',
  icons: {
    icon: [
      {
        url: '/favicon/favicon-light.svg',
        media: '(prefers-color-scheme: light)',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon/favicon-dark.svg',
        media: '(prefers-color-scheme: dark)',
        type: 'image/svg+xml',
      },
      // { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      data-scroll-behavior="smooth"
      className={`${notoSansJp.variable} ${notoSerifJp.variable} ${cormorantUnicase.variable}`}
    >
      <head>
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WVQBTF33"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WVQBTF33');
          `}
        </Script>
        <SvgDefs />
        <main>{children}</main>
      </body>
    </html>
  );
}
