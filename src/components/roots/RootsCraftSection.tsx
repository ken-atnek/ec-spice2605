/* =======================================
 * 熊日すぱいす ROOTS CRAFT セクション
 * URL: /src/components/roots/RootsCraftSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsCraftSection.module.scss";
import RootsOutlineCtaLink from "./RootsOutlineCtaLink";

type CraftItem = {
  image: string;
  title: string;
  textWithImage: string[];
};

type Props = {
  mainTitle: string;
  mainText: string[];
  ecUrl: string;
  items: CraftItem[];
};

export default function RootsCraftSection({
  mainTitle,
  mainText,
  ecUrl,
  items,
}: Props) {
  return (
    <section className={styles.rootsCraftSection}>
      <header className={styles.head}>
        <p className={styles.titleEn}>CRAFT</p>
        <hr className={styles.rule} />
        <p className={styles.titleJa}>商品の想い</p>
        <p className={styles.dot}>・<br />・<br />・<br />・<br />・</p>
      </header>

      <h2 className={styles.mainTitle}>{mainTitle}</h2>
      {mainText.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`} className={styles.mainText}>
          {paragraph}
        </p>
      ))}

      <RootsOutlineCtaLink href={ecUrl}>
        シェ・タニのバウムクーヘンを<br />公式オンラインショップで見る
      </RootsOutlineCtaLink>

      <div className={styles.list}>
        {items.map((item, index) => {
          const no = String(index + 1).padStart(2, "0");
          return (
            <article key={`${item.title}-${index}`} className={styles.item}>
              <p className={styles.itemNo}>{no}</p>
              <img className={styles.itemImage} src={item.image} alt={item.title} />
              <h3 className={styles.itemTitle}>{item.title}</h3>
              {item.textWithImage.map((paragraph, pIndex) => (
                <p key={`${paragraph}-${pIndex}`} className={styles.itemText}>
                  {paragraph}
                </p>
              ))}
            </article>
          );
        })}
      </div>

      <RootsOutlineCtaLink href={ecUrl}>
        シェ・タニのバウムクーヘンを<br />公式オンラインショップで見る
      </RootsOutlineCtaLink>
    </section>
  );
}
