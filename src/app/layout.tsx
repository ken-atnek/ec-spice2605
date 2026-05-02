/* =======================================
 *熊日すぱいす Layout
 * URL:src/app/layout.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import type { Metadata } from "next";
import "@/styles/globals.scss";
import SvgDefs from "@/components/SvgDefs";
import { isRealProduction } from "@/lib/env";
import { Noto_Sans_JP, Noto_Serif_JP, Cormorant_Unicase } from "next/font/google";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp-sans",
  display: "swap",
});

const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jp-serif",
  display: "swap",
});

const cormorantUnicase = Cormorant_Unicase({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

// 本番のみ metadataBase を設定
const metadataBase = isRealProduction
  ? new URL(
      process.env.NEXT_PUBLIC_METADATA_BASE || "https://yuuken-kumamoto.jp/",
    )
  : undefined;

export const metadata: Metadata = {
  ...(isRealProduction && {
    metadataBase,
    openGraph: {
      url: metadataBase?.toString(),
      type: "website",
      images: [
        {
          url: "/ogp.jpg",
          width: 1200,
          height: 630,
          alt: "熊日すぱいすのOGP画像",
        },
      ],
    },
  }),
  robots: isRealProduction ? "index, follow" : "noindex, nofollow",
  icons: {
    icon: [
      {
        url: "/favicon/favicon-light.svg",
        media: "(prefers-color-scheme: light)",
        type: "image/svg+xml",
      },
      {
        url: "/favicon/favicon-dark.svg",
        media: "(prefers-color-scheme: dark)",
        type: "image/svg+xml",
      },
      // { url: '/favicon/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
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
        <SvgDefs />
        <main>{children}</main>
      </body>
    </html>
  );
}
