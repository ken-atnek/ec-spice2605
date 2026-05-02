/* =======================================
 * 熊日すぱいす ROOTS INFO セクション
 * URL: /src/components/roots/RootsInfoSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsInfoSection.module.scss";

type Props = {
  infoShopName: string;
  place: string;
  mapUrl: string;
  businessHours: string[];
  tel: string;
  holiday: string;
};

export default function RootsInfoSection({
  infoShopName,
  place,
  mapUrl,
  businessHours,
  tel,
  holiday,
}: Props) {
  return (
    <section className={styles.root}>
      <div className={styles.inner}>
        <header className={styles.head}>
          <p className={styles.titleEn}>INFO.</p>
          <hr className={styles.rule} />
          <p className={styles.titleJa}>お店情報</p>
        </header>

        <div className={styles.row}>
          <p className={styles.label}>店名</p>
          <p className={styles.value}>{infoShopName}</p>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>場所</p>
          <p className={styles.value}>{place}</p>
          <a href={mapUrl} target="_blank" rel="noopener noreferrer" className={styles.mapButton}>
            google map
          </a>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>営業時間</p>
          {businessHours.map((line, index) => (
            <p key={`${line}-${index}`} className={styles.value}>{line}</p>
          ))}
        </div>

        <div className={styles.row}>
          <p className={styles.label}>電話</p>
          <p className={styles.value}>{tel}</p>
        </div>

        <div className={styles.row}>
          <p className={styles.label}>休日</p>
          <p className={styles.value}>{holiday}</p>
        </div>
      </div>
    </section>
  );
}
