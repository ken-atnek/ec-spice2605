/* =======================================
 * 熊日すぱいす ROOTS Hero
 * URL: /src/components/roots/RootsHero.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-01
 * Last updated: 2026-05-01
 * ======================================= */
import styles from "./RootsHero.module.scss";

type Props = {
  image: string;
  catchCopy: string;
};

export default function RootsHero({ image, catchCopy }: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.visual} style={{ backgroundImage: `url(${image})` }}>
        <div className={styles.logoCard}>
          <p className={styles.logoMain}>SPICE</p>
          <p className={styles.logoSub}>よかモノがたり</p>
        </div>

        <button type="button" className={styles.menuButton} aria-label="メニュー">
          ≡
        </button>

        <p className={styles.catchCopy}>{catchCopy}</p>
        <div className={styles.overlay} />
      </div>
    </section>
  );
}
