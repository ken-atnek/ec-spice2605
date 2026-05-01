"use client";
/* =======================================
 * 熊日すぱいす ROOTS ページ
 * URL: /src/app/roots/page.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-05-01
 * ======================================= */
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import RootsHero from "@/components/roots/RootsHero";
import RootsCommonProfile from "@/components/roots/RootsCommonProfile";
import {
  fetchCommonData,
  fetchProductPage,
  fetchStoryPage,
  type CommonData,
  type ProductPageData,
  type StoryPageData,
} from "@/lib/roots/fetchRootsData";

// useSearchParams を使うため Suspense 内に分離
function RootsContent() {
  // URLクエリから id と page を取得
  // 例: /roots/?id=roots_001&page=story
  const searchParams = useSearchParams();
  const id = searchParams.get("id");             // "roots_001"
  const page = searchParams.get("page");         // "story" | null
  const folderId = id?.replace("roots_", "");    // "001" (JSONフォルダ名)
  const isStoryPage = page === "story";

  // ページ種別に応じたJSONデータ
  const [productPage, setProductPage] = useState<ProductPageData | null>(null);
  const [storyPage, setStoryPage] = useState<StoryPageData | null>(null);
  // 両ページ共通データ (common.json)
  const [commonData, setCommonData] = useState<CommonData | null>(null);
  const [isError, setIsError] = useState(false);

  // ページ種別に応じて商品 or ストーリーのJSONをfetch
  useEffect(() => {
    if (!folderId) return;
    if (isStoryPage) {
      fetchStoryPage(folderId).then(setStoryPage).catch(() => setIsError(true));
      return;
    }
    fetchProductPage(folderId).then(setProductPage).catch(() => setIsError(true));
  }, [folderId, isStoryPage]);

  // common.json は両ページ共通で常にfetch
  useEffect(() => {
    if (!folderId) return;
    fetchCommonData(folderId).then(setCommonData).catch(() => setIsError(true));
  }, [folderId]);

  // 両ページで共通して表示するプロフィールセクション
  const commonSection = commonData ? (
    <RootsCommonProfile
      shopName={commonData.shopName}
      position={commonData.position}
      name={commonData.name}
      nameEn={commonData.nameEn}
      pageText={commonData.pageText}
      illustration={commonData.illustration}
    />
  ) : null;

  // --- ストーリーページ ---
  if (isStoryPage) {
    const storyHeroImage = storyPage?.hero?.image;
    const storyHeroText = storyPage?.hero?.text;
    if (!storyHeroImage || !storyHeroText || !commonData) return null;
    return (
      <>
        <RootsHero
          image={storyHeroImage}
          catchCopy={storyHeroText.join("\n")}
        />
        {commonSection}
      </>
    );
  }

  // --- 商品ページ ---
  if (isError) return <p>データの読み込みに失敗しました。</p>;
  if (!productPage || !commonData) return null;

  return (
    <>
      <RootsHero
        image={productPage.hero.image}
        catchCopy={productPage.hero.text.join("\n")}
      />
      {commonSection}
    </>
  );
}

// useSearchParams を Suspense でラップしないと静的エクスポート時にビルドエラーになる
export default function RootsPage() {
  return (
    <Suspense>
      <RootsContent />
    </Suspense>
  );
}
