/* =======================================
 * 熊日すぱいす TOPページ
 * URL: /src/app/page.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-06-08
 * ======================================= */

import type { Metadata } from 'next';
import HomePageContent from './HomePageContent';

export const generateMetadata = (): Metadata => {
  return {
    title: 'よかモノがたり｜熊日すぱいす',
    description:
      '作り手のストーリーや、作品・商品に込めた思いを届ける「よかモノがたり」。熊日すぱいすが熊本の本当の魅力を取材して紹介します。',
  };
};

export default function Home() {
  return <HomePageContent />;
}
