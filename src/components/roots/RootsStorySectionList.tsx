/* =======================================
 * 熊日すぱいす ROOTS STORY セクション一覧
 * URL: /src/components/roots/RootsStorySectionList.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import Image from 'next/image';
import styles from './RootsStorySectionList.module.scss';

type SectionItem = {
  image: string;
  title: string | string[];
  textWithImage: string[];
};

type Props = {
  sections: SectionItem[];
};

export default function RootsStorySectionList({ sections }: Props) {
  return (
    <section className={styles.rootsStorySectionList}>
      <ul className={styles.listStory}>
        {sections.map((section, index) => {
          const no = `#${String(index + 1).padStart(2, '0')}`;
          const titleLines = Array.isArray(section.title)
            ? section.title
            : [section.title];
          const titleText = Array.isArray(section.title)
            ? section.title.join('')
            : section.title;
          return (
            <li key={`${titleText}-${index}`}>
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
              <h3>
                {titleLines.map((line, lineIndex) => (
                  <span key={`${line}-${lineIndex}`}>
                    {line}
                    {lineIndex < titleLines.length - 1 ? <br /> : null}
                  </span>
                ))}
              </h3>
              <div className={styles.itemText}>
                {section.textWithImage.map((paragraph, pIndex) => (
                  <p key={`${paragraph}-${pIndex}`} className={styles.text}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
