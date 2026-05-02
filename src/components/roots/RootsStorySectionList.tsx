/* =======================================
 * 熊日すぱいす ROOTS STORY セクション一覧
 * URL: /src/components/roots/RootsStorySectionList.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import Image from "next/image";
import styles from "./RootsStorySectionList.module.scss";

type SectionItem = {
  image: string;
  title: string;
  textWithImage: string[];
};

type Props = {
  sections: SectionItem[];
};

export default function RootsStorySectionList({ sections }: Props) {
  return (
    <section className={styles.root}>
      {sections.map((section, index) => {
        const no = `#${String(index + 1).padStart(2, "0")}`;
        const isLast = index === sections.length - 1;
        return (
          <article key={`${section.title}-${index}`} className={styles.item}>
            <p className={styles.no}>{no}</p>
            <Image
              src={section.image}
              alt={section.title}
              width={1200}
              height={700}
              className={styles.image}
            />
            <h3 className={styles.title}>{section.title}</h3>
            {section.textWithImage.map((paragraph, pIndex) => (
              <p key={`${paragraph}-${pIndex}`} className={styles.text}>
                {paragraph}
              </p>
            ))}
            {!isLast ? <p className={styles.dot}>・<br />・<br />・<br />・<br />・</p> : null}
          </article>
        );
      })}
    </section>
  );
}
