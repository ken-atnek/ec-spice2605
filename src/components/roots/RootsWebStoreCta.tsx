/* =======================================
 * 熊日すぱいす ROOTS WEB STORE CTA
 * URL: /src/components/roots/RootsWebStoreCta.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsWebStoreCta.module.scss";
import ExternalLink from "@/components/common/ExternalLink";

type Props = {
  url: string;
  onClick?: () => void;
};

export default function RootsWebStoreCta({ url, onClick }: Props) {
  return (
    <section className={styles.rootsWebStoreCta}>
      <ExternalLink href={url} onClick={onClick}>
        <div>
          <p className={styles.lead}>ご購入はこちら</p>
          <p className={styles.title}>WEB STORE</p>
        </div>
        <svg role="img" aria-labelledby="logoTitle">
          <title id="logoTitle">カートアイコン</title>
          <use href="#svgCart" />
        </svg>
      </ExternalLink>
    </section>
  );
}
