'use client';
/* =======================================
 * 熊日すぱいす ROOTS ページ
 * URL: /src/app/roots/page.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-05-01
 * ======================================= */
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RootsHero from '@/components/roots/RootsHero';
import RootsCommonProfile from '@/components/roots/RootsCommonProfile';
import RootsWebStoreCta from '@/components/roots/RootsWebStoreCta';
import RootsCraftSection from '@/components/roots/RootsCraftSection';
import RootsStoryTeaser from '@/components/roots/RootsStoryTeaser';
import RootsInfoSection from '@/components/roots/RootsInfoSection';
import RootsEventSection from '@/components/roots/RootsEventSection';
import RootsFooter from '@/components/roots/RootsFooter';
import RootsNoticeText from '@/components/roots/RootsNoticeText';
import RootsStorySectionList from '@/components/roots/RootsStorySectionList';
import RootsProductLinkCard from '@/components/roots/RootsProductLinkCard';
import RootsHeaderMenu from '@/components/roots/RootsHeaderMenu';
import RootsImageListSection from '@/components/roots/RootsImageListSection';
import {
  fetchCommonData,
  fetchEventsData,
  fetchInfoData,
  fetchProductPage,
  fetchStoryPage,
  type CommonData,
  type EventsData,
  type InfoData,
  type ProductPageData,
  type StoryPageData,
} from '@/lib/roots/fetchRootsData';

// useSearchParams を使うため Suspense 内に分離
function RootsContent() {
  // URLクエリから id と page を取得
  // 例: /roots/?id=roots_001&page=story
  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // "roots_001"
  const page = searchParams.get('page'); // "story" | null
  const folderId = id?.replace('roots_', ''); // "001" (JSONフォルダ名)
  const isStoryPage = page === 'story';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ページ種別に応じたJSONデータ
  const [productPage, setProductPage] = useState<ProductPageData | null>(null);
  const [storyPage, setStoryPage] = useState<StoryPageData | null>(null);
  // 両ページ共通データ (common.json)
  const [commonData, setCommonData] = useState<CommonData | null>(null);
  const [infoData, setInfoData] = useState<InfoData | null>(null);
  const [eventsData, setEventsData] = useState<EventsData | null>(null);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 商品・ストーリー両方のJSONをfetch（画像リストで両heroを使う）
  useEffect(() => {
    if (!folderId) return;
    Promise.all([fetchProductPage(folderId), fetchStoryPage(folderId)])
      .then(([product, story]) => {
        setProductPage(product);
        setStoryPage(story);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(
          error instanceof Error ? error.message : 'fetch failed'
        );
      });
  }, [folderId, isStoryPage]);

  // common.json は両ページ共通で常にfetch
  useEffect(() => {
    if (!folderId) return;
    fetchCommonData(folderId)
      .then(setCommonData)
      .catch((error) => {
        setIsError(true);
        setErrorMessage(
          error instanceof Error ? error.message : 'fetch failed'
        );
      });
  }, [folderId]);

  useEffect(() => {
    if (!folderId) return;
    fetchInfoData(folderId)
      .then(setInfoData)
      .catch((error) => {
        setIsError(true);
        setErrorMessage(
          error instanceof Error ? error.message : 'fetch failed'
        );
      });
  }, [folderId]);

  useEffect(() => {
    if (!folderId) return;
    fetchEventsData(folderId)
      .then(setEventsData)
      .catch((error) => {
        setIsError(true);
        setErrorMessage(
          error instanceof Error ? error.message : 'fetch failed'
        );
      });
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
  const webStoreSection = commonData?.onlineShopUrl ? (
    <RootsWebStoreCta url={commonData.onlineShopUrl} />
  ) : null;
  const menuItems = [
    {
      en: 'STORY',
      ja: '人物ストーリー',
      href: `/roots?id=roots_${folderId}&page=story#story`,
    },
    {
      en: 'CRAFT',
      ja: '商品へのこだわり',
      href: `/roots?id=roots_${folderId}#craft`,
    },
    { en: 'INFO.', ja: 'お店情報', href: `#info` },
    { en: 'EVENT', ja: 'イベント', href: `#event` },
  ];

  // --- ストーリーページ ---
  if (isStoryPage) {
    const storyHeroImage = storyPage?.hero?.image;
    const storyHeroText = storyPage?.hero?.text;
    if (isError) return <p>データの読み込みに失敗しました。{errorMessage}</p>;
    if (!storyHeroImage || !storyHeroText?.length || !commonData)
      return <p>読み込み中です...</p>;
    return (
      <>
        <RootsHeaderMenu
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen((prev) => !prev)}
          onClose={() => setIsMenuOpen(false)}
          items={menuItems}
          webStoreUrl={commonData?.onlineShopUrl}
        />
        <RootsHero image={storyHeroImage} catchCopy={storyHeroText} />
        {commonSection}
        {storyPage?.sections && storyPage.sections.length > 0 ? (
          <div id="story">
            <RootsStorySectionList sections={storyPage.sections} />
          </div>
        ) : null}
        {commonData.productLinkImage ? (
          <RootsProductLinkCard
            href={`/roots?id=roots_${folderId}`}
            image={commonData.productLinkImage}
          />
        ) : null}
        {webStoreSection}
        {infoData ? (
          <div id="info">
            <RootsInfoSection
              infoShopName={infoData.infoShopName}
              place={infoData.place}
              mapUrl={infoData.mapUrl}
              businessHours={infoData.businessHours}
              tel={infoData.tel}
              holiday={infoData.holiday}
            />
          </div>
        ) : null}
        {eventsData && eventsData.isVisible !== false ? (
          <div id="event">
            <RootsEventSection
              image={eventsData.image}
              title={eventsData.title}
              text={eventsData.text}
            />
          </div>
        ) : null}
        <RootsImageListSection
          portraitImages={[storyHeroImage, productPage?.hero.image || '']}
          squareImages={[
            ...(storyPage?.sections?.map((section) => section.image) || []),
            ...(productPage?.items.flatMap((item) =>
              (item.contentBlocks || [])
                .filter((block) => block.type === 'image' && block.src)
                .map((block) => block.src || '')
            ) || []),
          ]}
          landscapeImages={[
            commonData.productLinkImage || '',
            productPage?.personStoryImage || '',
            ...(productPage?.items.map((item) => item.image) || []),
          ]}
        />
        {webStoreSection}
        {commonData?.commonNotice ? (
          <RootsNoticeText text={commonData.commonNotice} />
        ) : null}

        <RootsFooter />
      </>
    );
  }

  // --- 商品ページ ---
  if (isError) return <p>データの読み込みに失敗しました。{errorMessage}</p>;
  if (!productPage || !commonData) return <p>読み込み中です...</p>;

  return (
    <>
      <RootsHeaderMenu
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((prev) => !prev)}
        onClose={() => setIsMenuOpen(false)}
        items={menuItems}
        webStoreUrl={commonData?.onlineShopUrl}
      />
      <RootsHero
        image={productPage.hero.image}
        catchCopy={productPage.hero.text}
      />
      {commonSection}
      {webStoreSection}
      <div id="craft">
        <RootsCraftSection
          mainTitle={productPage.main.title}
          mainText={productPage.main.text}
          onlineTitle={
            productPage.onlineTitle || 'シェ・タニのバウムクーヘンを'
          }
          ecUrl={productPage.ecUrl}
          items={productPage.items}
        />
      </div>
      {webStoreSection}
      {productPage.personStoryImage ? (
        <RootsStoryTeaser
          image={productPage.personStoryImage}
          storyHref={`/roots?id=roots_${folderId}&page=story`}
          shopName={commonData.shopName}
          position={commonData.position}
          name={commonData.name}
          nameEn={commonData.nameEn}
          pageText={commonData.pageText}
          illustration={commonData.illustration}
        />
      ) : null}
      {webStoreSection}
      {infoData ? (
        <div id="info">
          <RootsInfoSection
            infoShopName={infoData.infoShopName}
            place={infoData.place}
            mapUrl={infoData.mapUrl}
            businessHours={infoData.businessHours}
            tel={infoData.tel}
            holiday={infoData.holiday}
          />
        </div>
      ) : null}
      {eventsData && eventsData.isVisible !== false ? (
        <div id="event">
          <RootsEventSection
            image={eventsData.image}
            title={eventsData.title}
            text={eventsData.text}
          />
        </div>
      ) : null}
      <RootsImageListSection
        portraitImages={[productPage.hero.image, storyPage?.hero?.image || '']}
        squareImages={[
          ...productPage.items.flatMap((item) =>
            (item.contentBlocks || [])
              .filter((block) => block.type === 'image' && block.src)
              .map((block) => block.src || '')
          ),
          ...(storyPage?.sections?.map((section) => section.image) || []),
        ]}
        landscapeImages={[
          productPage.personStoryImage || '',
          ...productPage.items.map((item) => item.image),
          commonData.productLinkImage || '',
        ]}
      />
      {webStoreSection}
      {commonData?.commonNotice ? (
        <RootsNoticeText text={commonData.commonNotice} />
      ) : null}

      <RootsFooter />
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
