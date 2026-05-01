/* =======================================
 * 熊日すぱいす ナビメニュー定義
 * URL: /src/data/navMenuData.ts
 * Referenced in: /src/components/common/Header.tsx, /src/components/common/Footer.tsx
 * Created: 2026-05-01
 * Last updated: 2026-05-01
 * ======================================= */
export type NavMenuItem = {
  href: string;
  label: string;
};

export const navMenu: NavMenuItem[] = [
  { href: "#top", label: "TOP" },
  { href: "#about", label: "ABOUT" },
  { href: "#story", label: "STORY" },
  { href: "#contact", label: "CONTACT" },
];
