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
    title: "よかモノがたり｜熊日すぱいす",
    description: isRealProduction
      ? "熊本の暮らしに役立つ情報サイト「くまにち すぱいす」。グルメ、子育て、おでかけなど、地元熊本に28万部配布のフリーペーパーがお届け！"
      : undefined,
  };
};
export default function Home() {
  return <>123</>;
}
