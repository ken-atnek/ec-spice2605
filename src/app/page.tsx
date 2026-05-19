/* =======================================
 * 熊日すぱいす TOPページ
 * URL: /src/app/page.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-05-19
 * ======================================= */

import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const generateMetadata = (): Metadata => {
  return {
    title: 'よかモノがたり｜熊日すぱいす',
    robots: 'noindex, nofollow',
  };
};
export default function Home() {
  redirect('/roots/?id=roots_001');
}
