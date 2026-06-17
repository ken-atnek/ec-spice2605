'use client';
/* =======================================
 * 熊日すぱいす TOPページ本文
 * URL: /src/app/HomePageContent.tsx
 * Referenced in: /src/app/page.tsx
 * Created: 2026-06-08
 * Last updated: 2026-06-17
 * ======================================= */

import { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import RootsFooter from '@/components/roots/RootsFooter';
import { withBasePath } from '@/utils/withBasePath';
import styles from '@/styles/PageTop.module.scss';

type TopIndexItem = {
  id: string;
  topLinkType: 'product' | 'story';
  publishedAt: string;
  cardName?: string;
};

type CommonData = {
  shopName: string;
  name: string;
  productLinkImage?: string;
};

type ProductPageData = {
  personStoryImage?: string;
  hero?: {
    image?: string;
    text?: string[];
  };
};

type StoryPageData = {
  hero?: {
    image?: string;
    text?: string[];
  };
};

type TopCardItem = TopIndexItem & {
  shopName: string;
  name: string;
  cardName: string;
  image: string;
  href: string;
  headlineLines: string[];
};

type NewsData = {
  date: string;
  content: string;
};

function fetchJson<T>(path: string): Promise<T> {
  const ts = Date.now();
  const url = `${withBasePath(path)}?t=${ts}`;

  return fetch(url, { cache: 'no-store' }).then((res) => {
    if (!res.ok) {
      throw new Error(`fetch failed: ${res.status} ${url}`);
    }
    return res.json() as Promise<T>;
  });
}

function formatPublishedAt(value: string): string {
  return value.replaceAll('-', '/');
}

function createHeadlineLines(textList?: string[]): string[] {
  if (!textList?.length) return [];
  return textList.filter((text) => text.trim());
}

export default function HomePageContent() {
  const [cards, setCards] = useState<TopCardItem[]>([]);
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetchJson<NewsData>('/db/roots/news.json')
      .then((json) => {
        if (isMounted) {
          setNewsData(json);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
        }
      });

    fetchJson<TopIndexItem[]>('/db/roots/index.json')
      .then(async (indexItems) => {
        const resolvedCards = await Promise.all(
          indexItems.map(async (item) => {
            const folderId = item.id;
            const [commonData, productPage, storyPage] = await Promise.all([
              fetchJson<CommonData>(
                `/db/roots/details/${folderId}/common.json`
              ),
              fetchJson<ProductPageData>(
                `/db/roots/details/${folderId}/productPage.json`
              ),
              fetchJson<StoryPageData>(
                `/db/roots/details/${folderId}/storyPage.json`
              ),
            ]);

            const rootsId = `roots_${folderId}`;
            const href =
              item.topLinkType === 'story'
                ? `/roots/?id=${rootsId}&page=story`
                : `/roots/?id=${rootsId}`;
            const image =
              item.topLinkType === 'story'
                ? storyPage.hero?.image || ''
                : productPage.hero?.image || '';
            const headlineLines =
              item.topLinkType === 'story'
                ? createHeadlineLines(storyPage.hero?.text)
                : createHeadlineLines(productPage.hero?.text);

            return {
              ...item,
              shopName: commonData.shopName,
              name: commonData.name,
              cardName: item.cardName || commonData.name,
              image,
              href,
              headlineLines,
            };
          })
        );

        if (isMounted) {
          setCards(resolvedCards);
          setIsError(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsError(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isError) {
    return <p className={styles.status}>データの読み込みに失敗しました。</p>;
  }

  if (!cards.length) {
    return <p className={styles.status}>読み込み中です...</p>;
  }

  return (
    <>
      <section className={styles.containerHeader}>
        <article>
          <div className={styles.itemLogo}>
            <Image
              src="/images/spice-logo.webp"
              alt="熊日すぱいす"
              width={127}
              height={54}
              priority
            />
          </div>
          <p>熊本のよかモノ特集</p>
        </article>
      </section>
      <section className={styles.containerHead}>
        <h1>
          <span className={styles.visuallyHidden}>よかモノがたり</span>
          <svg role="img" aria-hidden="true">
            <use href="#svgLogo" />
          </svg>
        </h1>
        <div className={styles.wrapHeadText}>
          <p>
            「よかモノがたり」は、熊本県内のこだわり抜かれた逸品と、それを生み出す生産者、店主、職人たちの思いを紹介する“読んで買えるウェブマガジン”です。
            <br />
            作り手の想いとともに、“熊本のいいもの”をあなたのもとへお届けします。
            <br />
            運営するのは、熊本県内で毎週28万部を発行する地域密着のフリーペーパー「くまにちすぱいす」。長年にわたり地元を歩き、地域に眠る魅力を丁寧に取材してきた編集部が、その確かな目利きで厳選した情報をお届けします。
            <br />
            恵み豊かな自然の中で育った新鮮な熊本の農産物や、伝統の技と新しい感性から生まれる絶品スイーツなど―。なぜ、こんなにも美味しいのか。なぜ、これほど愛されるのか。普段は見ることのできない「作った人の顔」や「一品に込められた情熱、ストーリー」を丁寧に紐解きます。
          </p>
        </div>
        <article className={styles.blockNews}>
          {newsData ? (
            <section className={styles.innerNews}>
              <h2>NEWS</h2>
              <div className={styles.boxDetails}>
                <span>{newsData.content}</span>
                <time dateTime={newsData.date}>
                  {formatPublishedAt(newsData.date)}
                </time>
              </div>
            </section>
          ) : null}
        </article>
      </section>
      <section className={styles.containerList} aria-label="記事一覧">
        <ul>
          {cards.map((card) => (
            <li key={`${card.id}-${card.topLinkType}`}>
              <Link href={card.href}>
                <time className={styles.cardDate} dateTime={card.publishedAt}>
                  {formatPublishedAt(card.publishedAt)}
                </time>
                <div className={styles.cardImage}>
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={`${card.shopName} ${card.name}`}
                      width={362}
                      height={520}
                    />
                  ) : null}
                </div>
                <div className={styles.cardBody}>
                  <p className={styles.cardHeadline}>
                    {card.headlineLines.map((line, index) => (
                      <Fragment key={`${card.id}-headline-${index}`}>
                        {index > 0 ? <br /> : null}
                        {line}
                      </Fragment>
                    ))}
                  </p>
                  <div className={styles.cardMeta}>
                    <p className={styles.cardShop}>{card.shopName}</p>
                    <p className={styles.cardName}>{card.cardName}</p>
                  </div>
                  <span className={styles.cardArrow} aria-hidden="true">
                    →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <RootsFooter />
    </>
  );
}
