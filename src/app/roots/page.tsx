'use client';
/* =======================================
 * 熊日すぱいす ROOTS ページ
 * URL: /src/app/roots/page.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-04-04
 * Last updated: 2026-05-09
 * ======================================= */
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import RootsLeadSection from '@/components/roots/RootsLeadSection';
import RootsCraftSection from '@/components/roots/RootsCraftSection';
import RootsStoryTeaser from '@/components/roots/RootsStoryTeaser';
import RootsInfoSection from '@/components/roots/RootsInfoSection';
import RootsEventSection from '@/components/roots/RootsEventSection';
import RootsFooter from '@/components/roots/RootsFooter';
import RootsStorySectionList from '@/components/roots/RootsStorySectionList';
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
  const rootsId = id || 'roots_001';
  const folderId = rootsId.replace('roots_', ''); // "001" (JSONフォルダ名)
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

  const menuItems = [
    {
      en: 'STORY',
      ja: '人物ストーリー',
      href: `/roots?id=${rootsId}&page=story`,
    },
    {
      en: 'CRAFT',
      ja: '商品へのこだわり',
      href: `/roots?id=${rootsId}`,
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
        <RootsLeadSection
          heroImage={storyHeroImage}
          heroCatchCopy={storyHeroText}
          commonData={commonData}
        />
        {storyPage?.sections && storyPage.sections.length > 0 ? (
          <div id="story">
            <RootsStorySectionList
              sections={storyPage.sections}
              commonData={commonData}
              productLinkHref={`/roots?id=roots_${folderId}`}
              showWebStore
            />
          </div>
        ) : null}
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
          webStoreUrl={commonData.onlineShopUrl}
          commonNotice={commonData.commonNotice}
        />

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
      <RootsLeadSection
        heroImage={productPage.hero.image}
        heroCatchCopy={productPage.hero.text}
        commonData={commonData}
        showWebStore
      />
      <div id="craft">
        <RootsCraftSection
          mainTitle={productPage.main.title}
          mainText={productPage.main.text}
          onlineTitle={
            productPage.onlineTitle || 'シェ・タニのバウムクーヘンを'
          }
          ecUrl={productPage.ecUrl}
          items={productPage.items}
          webStoreUrl={commonData.onlineShopUrl}
        />
      </div>
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
          webStoreUrl={commonData.onlineShopUrl}
        />
      ) : null}
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
        webStoreUrl={commonData.onlineShopUrl}
        commonNotice={commonData.commonNotice}
      />

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
