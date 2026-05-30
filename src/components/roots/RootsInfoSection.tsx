/* =======================================
 * 熊日すぱいす ROOTS INFO セクション
 * URL: /src/components/roots/RootsInfoSection.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-30
 * ======================================= */
import styles from './RootsInfoSection.module.scss';
import ExternalLink from '@/components/common/ExternalLink';

type Props = {
  rootsId?: string;
  infoShopName: string;
  place: string | string[];
  mapUrl: string;
  businessHours: string[];
  tel: string | string[];
  holiday: string;
};

export default function RootsInfoSection({
  rootsId,
  infoShopName,
  place,
  mapUrl,
  businessHours,
  tel,
  holiday,
}: Props) {
  const placeLines = Array.isArray(place) ? place : [place];
  const businessHoursLines = businessHours.filter(
    (line) => line.trim().length > 0
  );
  const telLines = (Array.isArray(tel) ? tel : [tel]).filter(
    (line) => line.trim().length > 0
  );
  const holidayText = holiday.trim();

  return (
    <section className={styles.rootsInfoSection} data-roots-id={rootsId}>
      <article>
        <div className={styles.itemH2}>
          <span>INFO.</span>
          <h2>お店情報</h2>
        </div>
        <dl>
          <div className={styles.itemWrap}>
            <div>
              <dt>店名</dt>
              <dd>
                <span>{infoShopName}</span>
              </dd>
            </div>
            <div>
              <dt>場所</dt>
              <dd>
                {placeLines.map((line, index) => (
                  <span key={`${line}-${index}`}>{line}</span>
                ))}
                <ExternalLink href={mapUrl} className={styles.linkMap}>
                  google map
                </ExternalLink>
              </dd>
            </div>
          </div>
          <div className={styles.itemWrap}>
            {businessHoursLines.length > 0 ? (
              <div>
                <dt>営業時間</dt>
                <dd>
                  {businessHoursLines.map((line, index) => (
                    <span key={`${line}-${index}`} className={styles.value}>
                      {line}
                    </span>
                  ))}
                </dd>
              </div>
            ) : null}
            {telLines.length > 0 ? (
              <div>
                <dt>電話</dt>
                <dd>
                  {telLines.map((line, index) => (
                    <span key={`${line}-${index}`}>{line}</span>
                  ))}
                </dd>
              </div>
            ) : null}
            {holidayText ? (
              <div>
                <dt>休日</dt>
                <dd>
                  <span>{holidayText}</span>
                </dd>
              </div>
            ) : null}
          </div>
        </dl>
      </article>
    </section>
  );
}
