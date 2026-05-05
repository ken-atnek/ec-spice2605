/* =======================================
 * 熊日すぱいす ROOTS EVENT セクション
 * URL: /src/components/roots/RootsEventSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-05
 * ======================================= */
import Image from 'next/image';
import styles from './RootsEventSection.module.scss';

type Props = {
  image: string;
  title: string;
  text: string[];
};

export default function RootsEventSection({ image, title, text }: Props) {
  return (
    <section className={styles.rootsEventSection}>
      <div className={styles.itemH2}>
        <span>event</span>
        <h2>イベント</h2>
      </div>

      <div className={styles.boxContents}>
        <h3>Shop Event</h3>
        <Image src={image} alt={title} width={1200} height={900} />
        <div className={styles.wrapDetails}>
          <h4 className={styles.postTitle}>{title}</h4>
          <div className={styles.itemText}>
            {text.map((paragraph, index) => (
              <p key={`${paragraph}-${index}`} className={styles.text}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
