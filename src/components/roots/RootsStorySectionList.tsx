/* =======================================
 * 熊日すぱいす ROOTS STORY セクション一覧
 * URL: /src/components/roots/RootsStorySectionList.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-28
 * ======================================= */
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import RootsWebStoreCta from '@/components/roots/RootsWebStoreCta';
import type { CommonData } from '@/lib/roots/fetchRootsData';
import styles from './RootsStorySectionList.module.scss';
type SectionItem = {
  image: string;
  title: string | string[];
  contentBlocks: {
    type: 'text' | 'image';
    text?: string;
    src?: string;
    alt?: string;
  }[];
};

type Props = {
  sections: SectionItem[];
  commonData: CommonData;
  productLinkHref?: string;
  showWebStore?: boolean;
};

export default function RootsStorySectionList({
  sections,
  commonData,
  productLinkHref,
  showWebStore = false,
}: Props) {
  return (
    <section className={styles.rootsStorySectionList}>
      <article>
        <ul className={styles.listStory}>
          {sections.map((section, index) => {
            const no = `#${String(index + 1).padStart(2, '0')}`;
            const titleLines = Array.isArray(section.title)
              ? section.title
              : [section.title];
            const titleText = Array.isArray(section.title)
              ? section.title.join('')
              : section.title;
            const contentBlocks = section.contentBlocks;
            return (
              <li key={`${titleText}-${index}`}>
                <div className={styles.innerLi}>
                  {index === 0 ? (
                    <div className={styles.itemH2}>
                      <span>story</span>
                      <h2>人物ストーリー</h2>
                    </div>
                  ) : null}
                  <p className={styles.no}>{no}</p>
                  <Image
                    src={section.image}
                    alt={titleText}
                    width={1200}
                    height={700}
                  />
                  <div className={styles.wrapText}>
                    <h3>
                      {titleLines.map((line, lineIndex) => (
                        <span key={`${line}-${lineIndex}`}>
                          {line}
                          {lineIndex < titleLines.length - 1 ? <br /> : null}
                        </span>
                      ))}
                    </h3>
                    <div className={styles.itemText}>
                      {contentBlocks.map((block, pIndex) => (
                        <Fragment key={`${block.type}-${pIndex}`}>
                          {block.type === 'text' && block.text !== undefined ? (
                            <p className={styles.text}>
                              {block.text === '' ? '\u00A0' : block.text}
                            </p>
                          ) : null}
                          {block.type === 'image' && block.src ? (
                            <Image
                              className={styles.itemInlineImage}
                              src={block.src}
                              alt={block.alt || titleText}
                              width={960}
                              height={640}
                            />
                          ) : null}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </article>
      {productLinkHref && commonData.productLinkImage ? (
        <div className={styles.blockProductLinkCard}>
          <Link href={productLinkHref}>
            <Image
              src={commonData.productLinkImage}
              alt="商品のこだわりはこちら"
              width={1200}
              height={900}
              className={styles.image}
            />
            <p>商品のこだわりはこちら</p>
          </Link>
        </div>
      ) : null}
      <div className={styles.boxStoreLink}>
        {showWebStore && commonData.onlineShopUrl ? (
          <RootsWebStoreCta url={commonData.onlineShopUrl} />
        ) : null}
      </div>
    </section>
  );
}
