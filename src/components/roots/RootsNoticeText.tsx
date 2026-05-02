/* =======================================
 * 熊日すぱいす ROOTS 注意文
 * URL: /src/components/roots/RootsNoticeText.tsx
 * Referenced in: /src/app/roots/page.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsNoticeText.module.scss";

type Props = {
  text: string;
};

export default function RootsNoticeText({ text }: Props) {
  return (
    <section className={styles.root}>
      <p className={styles.text}>{text}</p>
    </section>
  );
}
