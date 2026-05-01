/* =======================================
 *熊日すぱいす TOPページ
 * URL: src/app/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-04-04
 * ======================================= */

import type { Metadata } from "next";
import { isRealProduction } from "@/lib/env";

export const generateMetadata = (): Metadata => {
  return {
    title: "熊日すぱいす｜熊本県上益城郡益城町の建築工事",
    description: isRealProduction
      ? "熊本県上益城郡益城町で建築工事、大工工事、屋根工事、タイル・ブロツク工事、内装仕上工事、などの建設工事を行っております。"
      : undefined,
  };
};
export default function Home() {
  return <>123</>;
}
