/* =======================================
 * 熊日すぱいす ROOTS 商品リンクカード
 * URL: /src/components/roots/RootsProductLinkCard.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import Link from "next/link";
import Image from "next/image";
import styles from "./RootsProductLinkCard.module.scss";

type Props = {
  href: string;
  image: string;
};

export default function RootsProductLinkCard({ href, image }: Props) {
  return (
    <section className={styles.rootsProductLinkCard}>
      <Link href={href} className={styles.link}>
        <Image
          src={image}
          alt="商品のこだわりはこちら"
          width={1200}
          height={900}
          className={styles.image}
        />
      </Link>
    </section>
  );
}
