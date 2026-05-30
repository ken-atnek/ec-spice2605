/* =======================================
 * 熊日すぱいす ROOTS データ取得
 * URL: /src/lib/roots/fetchRootsData.ts
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-01
 * Last updated: 2026-05-28
 * ======================================= */
import { withBasePath } from "@/utils/withBasePath";

export type RootsTextLine =
  | string
  | {
      text: string;
      ruby?: string;
    };

export type ProductPageData = {
  hero: {
    image: string;
    text: RootsTextLine[];
  };
  pageText?: string[];
  main: {
    title: RootsTextLine | RootsTextLine[];
    text: string[];
  };
  onlineTitle?: string;
  ecUrl: string;
  items: {
    image: string;
    title: string | string[];
    contentBlocks: {
      type: "text" | "image";
      text?: string;
      src?: string;
      alt?: string;
    }[];
  }[];
  personStoryImage?: string;
};

export type StoryPageData = {
  hero?: {
    image?: string;
    text?: string[];
  };
  pageText?: string[];
  sections?: {
    image: string;
    title: string | string[];
    contentBlocks: {
      type: "text" | "image";
      text?: string;
      src?: string;
      alt?: string;
    }[];
  }[];
};

export type CommonData = {
  id?: string;
  shopName: string;
  position: string;
  name: string;
  nameEn: string;
  pageText: string[];
  illustration: string;
  productLinkImage?: string;
  commonNotice?: string;
  onlineShopUrl: string;
  seo?: {
    productTitle?: string;
    productDescription?: string;
    storyTitle?: string;
    storyDescription?: string;
  };
  eventAnchor?: {
    showOnProduct?: boolean;
    showOnStory?: boolean;
  };
};

export type InfoData = {
  infoShopName: string;
  place: string | string[];
  mapUrl: string;
  businessHours: string[];
  tel: string | string[];
  holiday: string;
};

export type EventsData = {
  isVisible?: boolean;
  image: string;
  title: string;
  text: string[];
};

function fetchJson<T>(path: string): Promise<T> {
  const ts = Date.now();
  const url = `${withBasePath(path)}?t=${ts}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  return fetch(url, { cache: "no-store", signal: controller.signal })
    .then((res) => {
      if (!res.ok) throw new Error(`fetch failed: ${res.status} ${url}`);
      return res.json() as Promise<T>;
    })
    .catch((error) => {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`fetch timeout: ${url}`);
      }
      if (error instanceof Error) throw error;
      throw new Error(`fetch failed: ${url}`);
    })
    .finally(() => clearTimeout(timer));
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

export function fetchInfoData(folderId: string): Promise<InfoData> {
  return fetchJson<InfoData>(`/db/roots/details/${folderId}/info.json`);
}

export function fetchEventsData(folderId: string): Promise<EventsData> {
  return fetchJson<EventsData>(`/db/roots/details/${folderId}/events.json`);
}
