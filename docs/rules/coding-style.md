## コーディング規約

### CSS方針

- Tailwind CSS は使用しない
- スタイルは SCSS で実装する

### ファイル種別ごとの命名規則

| ファイル | 命名規則          | 例                                                   |
| -------- | ----------------- | ---------------------------------------------------- |
| `.scss`  | ケバブケース      | `.my-button`, `$primary-color`, `@mixin flex-center` |
| `.tsx`   | キャメル/パスカル | `MyComponent`, `useState`, `handleClick`             |

**理由**: SCSSとTSXで命名規則を混在させない（可読性・保守性向上）
