# Rails API + Next.js プロジェクト

このプロジェクトは、DockerでRails API（バックエンド）を管理し、Next.js（フロントエンド）をローカルで実行する構成になっています。

## 構成

- **Backend**: Rails 7.1 (APIモード) + PostgreSQL (Docker管理)
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS (ローカル実行)

## セットアップ手順

### 1. 自動セットアップ（推奨）

```bash
chmod +x setup.sh
./setup.sh
```

### 2. 手動セットアップ

#### バックエンド（Rails API）の起動

```bash
# Docker Composeでバックエンドをビルド・起動
docker-compose build api
docker-compose up -d

# データベースのセットアップ（初回のみ）
docker-compose run --rm api rails db:create
docker-compose run --rm api rails db:migrate
docker-compose run --rm api rails db:seed
```

#### フロントエンド（Next.js）の起動

```bash
# フロントエンドディレクトリに移動
cd frontend

# 依存関係をインストール（初回のみ）
npm install

# 開発サーバーを起動
npm run dev
```

## アクセス先

- **フロントエンド**: http://localhost:3000
- **Rails API**: http://localhost:3001
- **PostgreSQL**: localhost:5432

## API エンドポイント

- `GET /api/v1/posts` - 投稿一覧取得
- `POST /api/v1/posts` - 投稿作成
- `GET /api/v1/posts/:id` - 投稿詳細取得
- `PUT /api/v1/posts/:id` - 投稿更新
- `DELETE /api/v1/posts/:id` - 投稿削除

### APIテスト例

```bash
# 投稿一覧取得
curl http://localhost:3001/api/v1/posts

# 新規投稿作成
curl -X POST http://localhost:3001/api/v1/posts \
  -H "Content-Type: application/json" \
  -d '{"post":{"title":"テスト投稿","content":"テスト内容"}}'
```

## 開発用コマンド

### バックエンド

```bash
# Rails コンソール
docker-compose exec api rails console

# ログ確認
docker-compose logs api

# コンテナに入る
docker-compose exec api bash

# マイグレーション実行
docker-compose run --rm api rails db:migrate

# シードデータ投入
docker-compose run --rm api rails db:seed
```

### フロントエンド

```bash
# 型チェック
npm run lint

# ビルド
npm run build

# 本番環境での起動
npm run start
```

## ディレクトリ構成

```
.
├── backend/              # Rails API
│   ├── app/
│   │   ├── controllers/
│   │   │   └── api/v1/
│   │   │       └── posts_controller.rb
│   │   └── models/
│   │       └── post.rb
│   ├── config/
│   │   ├── database.yml
│   │   ├── routes.rb
│   │   └── initializers/
│   │       └── cors.rb
│   ├── db/
│   │   ├── migrate/
│   │   └── seeds.rb
│   ├── Dockerfile
│   └── Gemfile
├── frontend/             # Next.js
│   ├── app/
│   │   └── page.tsx
│   ├── public/
│   ├── package.json
│   └── next.config.ts
├── docker-compose.yml
├── setup.sh
└── README.md
```

## 機能

- ✅ Rails 7.1 APIモード
- ✅ PostgreSQL データベース
- ✅ CORS設定済み
- ✅ Next.js 15 + TypeScript
- ✅ Tailwind CSS
- ✅ Docker環境
- ✅ RESTful API
- ✅ フロントエンドでのCRUD操作
- ✅ サンプルデータ付き

## トラブルシューティング

### APIが起動しない場合

```bash
# コンテナを停止して再ビルド
docker-compose down
docker-compose build api --no-cache
docker-compose up -d

# ログを確認
docker-compose logs api
```

### フロントエンドでAPIに接続できない場合

1. APIが http://localhost:3001 で起動していることを確認
2. CORS設定が正しく設定されていることを確認
3. ブラウザの開発者ツールでネットワークエラーを確認

### データベース関連のエラー

```bash
# データベースをリセット
docker-compose run --rm api rails db:drop db:create db:migrate db:seed
```# rails-jara
