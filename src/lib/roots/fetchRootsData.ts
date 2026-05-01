/* =======================================
 * 熊日すぱいす ROOTS データ取得
 * URL: /src/lib/roots/fetchRootsData.ts
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-01
 * Last updated: 2026-05-01
 * ======================================= */
import { withBasePath } from "@/utils/withBasePath";

export type ProductPageData = {
  hero: {
    image: string;
    text: string[];
  };
};

export type StoryPageData = {
  hero?: {
    image?: string;
    text?: string[];
  };
};

export type CommonData = {
  shopName: string;
  position: string;
  name: string;
  nameEn: string;
  pageText: string[];
  illustration: string;
};

function fetchJson<T>(path: string): Promise<T> {
  const ts = Date.now();
  return fetch(`${withBasePath(path)}?t=${ts}`, { cache: "no-store" }).then((res) => {
    if (!res.ok) throw new Error("fetch failed");
    return res.json() as Promise<T>;
  });
}

export function fetchProductPage(folderId: string): Promise<ProductPageData> {
  return fetchJson<ProductPageData>(`/db/roots/details/${folderId}/productPage.json`);
}

export function fetchCommonData(folderId: string): Promise<CommonData> {
  return fetchJson<CommonData>(`/db/roots/details/${folderId}/common.json`);
}

export function fetchStoryPage(folderId: string): Promise<StoryPageData> {
  return fetchJson<StoryPageData>(`/db/roots/details/${folderId}/storyPage.json`);
}
