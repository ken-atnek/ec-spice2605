## プロジェクト概要

Next.js 15 App Router + TypeScript + SCSS による静的サイト生成プロジェクト

## 環境構築

### 初期セットアップ

```bash
npx create-next-app@latest . --typescript
# App Router: Yes を選択
```

### 開発依存パッケージ

```bash
npm install -D prettier sass stylelint stylelint-config-standard-scss stylelint-scss rimraf cross-env
```

### next.config.ts

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 静的エクスポート必須
};

export default nextConfig;
```
