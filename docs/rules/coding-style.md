## コーディング規約

### CSS方針

- Tailwind CSS は使用しない
- スタイルは SCSS で実装する
- モバイルファーストの新規実装では、文字サイズは `fs-fluid()` を優先する
- `fz()` は既存コード互換（レガシー）として扱い、新規では原則使わない

### リンク実装方針

- 生の `a` タグは使わない
- 内部遷移は `Link` を使う
- 外部遷移は `ExternalLink` を使う

### ファイル種別ごとの命名規則

| ファイル | 命名規則          | 例                                                   |
| -------- | ----------------- | ---------------------------------------------------- |
| `.scss`  | ケバブケース      | `.my-button`, `$primary-color`, `@mixin flex-center` |
| `.tsx`   | キャメル/パスカル | `MyComponent`, `useState`, `handleClick`             |

**理由**: SCSSとTSXで命名規則を混在させない（可読性・保守性向上）

### Rootsコンポーネントのクラス命名

- `src/components/roots` 配下では、親ラッパークラスを `root` にしない
- 親ラッパーはコンポーネント名ベースのキャメルケースに統一する
- 例: `RootsHero.tsx` は `styles.rootsHero`、SCSS側は `.rootsHero {}`
