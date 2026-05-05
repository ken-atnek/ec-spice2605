/* =======================================
 * 熊日すぱいす ROOTS CRAFT セクション
 * URL: /src/components/roots/RootsCraftSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from './RootsCraftSection.module.scss';
import Image from 'next/image';
import { Fragment } from 'react';
import RootsOutlineCtaLink from './RootsOutlineCtaLink';

type ContentBlock = {
  type: 'text' | 'image';
  text?: string;
  src?: string;
  alt?: string;
};

type CraftItem = {
  image: string;
  title: string | string[];
  textWithImage: Array<string | ContentBlock>;
  contentBlocks?: ContentBlock[];
};

type Props = {
  mainTitle: string | string[];
  mainText: string[];
  onlineTitle: string;
  ecUrl: string;
  items: CraftItem[];
};

const toTitleLines = (title: string | string[]): string[] => {
  if (Array.isArray(title)) return title;
  return [title];
};

const toContentBlocks = (item: CraftItem): ContentBlock[] => {
  if (item.contentBlocks && item.contentBlocks.length > 0)
    return item.contentBlocks;

  return item.textWithImage.map((entry) => {
    if (typeof entry === 'string') return { type: 'text', text: entry };
    return entry;
  });
};

export default function RootsCraftSection({
  mainTitle,
  mainText,
  onlineTitle,
  ecUrl,
  items,
}: Props) {
  const titleLines = toTitleLines(mainTitle);

  return (
    <section className={styles.rootsCraftSection}>
      <div className={styles.itemH2}>
        <span>craft</span>
        <h2>商品への想い</h2>
      </div>
      <h3>
        {titleLines.map((line, index) => (
          <span key={`${line}-${index}`}>
            {line}
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

      <ul className={styles.productsList}>
        {items.map((item, index) => {
          const no = String(index + 1).padStart(2, '0');
          const itemTitleLines = toTitleLines(item.title);
          const itemTitleText = Array.isArray(item.title)
            ? item.title.join('')
            : item.title;
          const contentBlocks = toContentBlocks(item);
          return (
            <li key={`${itemTitleText}-${index}`}>
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
                  <span key={`${line}-${lineIndex}`}>
                    {line}
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
            </li>
          );
        })}
      </ul>

      <RootsOutlineCtaLink href={ecUrl}>
        {onlineTitle}
        <br />
        公式オンラインショップで見る
      </RootsOutlineCtaLink>
    </section>
  );
}
