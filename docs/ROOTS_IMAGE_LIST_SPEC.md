# ROOTS 画像リスト仕様（Footer直前）

## 配置

- 表示位置は `Footer` の直前（商品ページ / ストーリーページ共通）
- レイアウトは固定
  - 上段: 横長画像 1枚
  - 下段左: 縦長画像 1枚
  - 下段右: スクエア画像 2枚

## クリック動作

- 画像クリックでモーダル表示
- モーダル内で前後スライド（カルーセル）

## モーダル実装（Splide）

- 使用ライブラリ: `@splidejs/react-splide`
- 対象: Footer直前の画像リストモーダル
- 実装理由: スワイプ・ループ・矢印操作を安定して扱うため
- 表示方針: 隣スライドを少し見せる

### Splide オプション

- `type: 'loop'`
- `perPage: 1`
- `perMove: 1`
- `start: クリックした画像のindex`
- `pagination: false`
- `drag: true`
- `speed: 500`
- `gap: '0.8rem'`
- `padding: '6%'`

## 画像の区分ルール

- 縦長候補: `hero` 画像（商品ページ + ストーリーページ）
- スクエア候補: 記事内画像（`contentBlocks` の `type: image`）+ ストーリーセクション画像
- 横長候補: `personStoryImage` + `items[].image` + `productLinkImage`
- `event` 画像は使用しない

## ランダム仕様

- 各枠は候補配列からランダム抽出
- 抽選トリガーは再レンダー / 再マウント時
  - `useMemo(..., [portraitImages])`
  - `useMemo(..., [squareImages])`
  - `useMemo(..., [landscapeImages])`

## 実装ファイル

- `/src/components/roots/RootsImageListSection.tsx`
- `/src/components/roots/RootsImageListSection.module.scss`
- `/src/app/roots/page.tsx`
