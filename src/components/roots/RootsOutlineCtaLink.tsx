/* =======================================
 * 熊日すぱいす ROOTS 枠線CTAリンク
 * URL: /src/components/roots/RootsOutlineCtaLink.tsx
 * Referenced in: /src/components/roots/RootsCraftSection.tsx
 * Created: 2026-05-02
 * Last updated: 2026-05-02
 * ======================================= */
import styles from "./RootsOutlineCtaLink.module.scss";

type Props = {
  href: string;
  children: React.ReactNode;
};

export default function RootsOutlineCtaLink({ href, children }: Props) {
  return (
    <a
      href={href}
      className={styles.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
