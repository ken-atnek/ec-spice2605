/* =======================================
 * 熊日すぱいす ROOTS 共通プロフィール
 * URL: /src/components/roots/RootsCommonProfile.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-01
 * Last updated: 2026-05-01
 * ======================================= */
import Image from 'next/image';
import styles from './RootsCommonProfile.module.scss';

type Props = {
  shopName: string;
  position: string;
  name: string;
  nameEn: string;
  pageText: string[];
  illustration: string;
  isInsideTeaser?: boolean;
};

export default function RootsCommonProfile({
  shopName,
  position,
  name,
  nameEn,
  pageText,
  illustration,
  isInsideTeaser = false,
}: Props) {
  return (
    <div
      className={`${styles.rootsCommonProfile} ${
        isInsideTeaser ? styles.isInsideTeaser : ''
      }`}
    >
      <div className={styles.boxProfile}>
        <div className={styles.meta}>
          <p className={styles.shopName}>{shopName}</p>
          <p className={styles.position}>{position}</p>
          <p className={styles.name}>{name}</p>
          <p className={styles.nameEn}>{nameEn}</p>
        </div>
        <Image
          className={styles.illustration}
          src={illustration}
          alt="イラスト"
          width={200}
          height={200}
        />
      </div>

      {pageText.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`} className={styles.text}>
          {paragraph}
        </p>
      ))}
    </div>
  );
}
