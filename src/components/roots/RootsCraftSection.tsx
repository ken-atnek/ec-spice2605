/* =======================================
 * 熊日すぱいす ROOTS CRAFT セクション
 * URL: /src/components/roots/RootsCraftSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-28
 * ======================================= */
import styles from './RootsCraftSection.module.scss';
import Image from 'next/image';
import { Fragment } from 'react';
import type { RootsTextLine } from '@/lib/roots/fetchRootsData';
import RootsOutlineCtaLink from './RootsOutlineCtaLink';
import RootsWebStoreCta from './RootsWebStoreCta';

const getLineText = (line: RootsTextLine): string =>
  typeof line === 'string' ? line : line.text;

const renderLine = (line: RootsTextLine) => {
  if (typeof line === 'string') return line;
  if (!line.ruby) return line.text;

  return (
    <ruby>
      {line.text}
      <rt>{line.ruby}</rt>
    </ruby>
  );
};

type ContentBlock = {
  type: 'text' | 'image';
  text?: string;
  src?: string;
  alt?: string;
};

type CraftItem = {
  image: string;
  title: RootsTextLine | RootsTextLine[];
  contentBlocks: ContentBlock[];
};

type Props = {
  mainTitle: RootsTextLine | RootsTextLine[];
  mainText: string[];
  onlineTitle: string;
  ecUrl: string;
  items: CraftItem[];
  webStoreUrl?: string;
};

const toTitleLines = (title: RootsTextLine | RootsTextLine[]): RootsTextLine[] => {
  if (Array.isArray(title)) return title;
  return [title];
};

export default function RootsCraftSection({
  mainTitle,
  mainText,
  onlineTitle,
  ecUrl,
  items,
  webStoreUrl,
}: Props) {
  const titleLines = toTitleLines(mainTitle);

  return (
    <section className={styles.rootsCraftSection}>
      <div className={styles.blockHead}>
        <div className={styles.itemH2}>
          <span>craft</span>
          <h2>商品への想い</h2>
        </div>
        <h3>
          {titleLines.map((line, index) => (
            <span key={`${getLineText(line)}-${index}`}>
              {renderLine(line)}
              {index < titleLines.length - 1 ? <br /> : null}
            </span>
          ))}
        </h3>
        <div className={styles.wrapMainText}>
          {mainText.map((paragraph, index) => (
            <p key={`${paragraph}-${index}`} className={styles.mainText}>
              {paragraph}
            </p>
          ))}
        </div>

        <RootsOutlineCtaLink href={ecUrl}>
          {onlineTitle}
          <br />
          公式オンラインショップで見る
        </RootsOutlineCtaLink>
      </div>
      <ul className={styles.productsList}>
        {items.map((item, index) => {
          const no = String(index + 1).padStart(2, '0');
          const itemTitleLines = toTitleLines(item.title);
          const itemTitleText = itemTitleLines.map(getLineText).join('');
          const contentBlocks = item.contentBlocks;
          return (
            <li key={`${itemTitleText}-${index}`}>
              <div className={styles.innerLi}>
                <p className={styles.itemNo}>{no}</p>
                <Image
                  className={styles.itemImage}
                  src={item.image}
                  alt={itemTitleText}
                  width={640}
                  height={427}
                />
                <h4>
                  {itemTitleLines.map((line, lineIndex) => (
                    <span key={`${getLineText(line)}-${lineIndex}`}>
                      {renderLine(line)}
                      {lineIndex < itemTitleLines.length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h4>
                <div className={styles.itemDetails}>
                  {contentBlocks.map((block, blockIndex) => (
                    <Fragment key={`${block.type}-${blockIndex}`}>
                      {block.type === 'text' && block.text !== undefined ? (
                        <p className={styles.itemText}>
                          {block.text === '' ? '\u00A0' : block.text}
                        </p>
                      ) : null}
                      {block.type === 'image' && block.src ? (
                        <Image
                          className={styles.itemInlineImage}
                          src={block.src}
                          alt={block.alt || itemTitleText}
                          width={960}
                          height={640}
                        />
                      ) : null}
                    </Fragment>
                  ))}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <RootsOutlineCtaLink href={ecUrl}>
        {onlineTitle}
        <br />
        公式オンラインショップで見る
      </RootsOutlineCtaLink>
      {webStoreUrl ? (
        <div className={styles.boxStoreLink}>
          <RootsWebStoreCta url={webStoreUrl} />
        </div>
      ) : null}
    </section>
  );
}
