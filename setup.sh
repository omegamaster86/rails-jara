#!/bin/bash

echo "🚀 Rails API + Next.js 環境をセットアップしています..."

# Docker Composeでバックエンドをビルド
echo "📦 Rails API Dockerイメージをビルドしています..."
docker-compose build api

# データベースを作成・マイグレーション・シード
echo "🗄️ データベースをセットアップしています..."
docker-compose run --rm api bash -c "
  bundle exec rails db:create &&
  bundle exec rails db:migrate &&
  bundle exec rails db:seed
"

# フロントエンドの依存関係をインストール
echo "⚛️ フロントエンドの依存関係をインストールしています..."
cd frontend
npm install
cd ..

echo "✅ セットアップが完了しました！"
echo ""
echo "🌐 アプリケーションを起動するには："
echo "1. バックエンド: docker-compose up -d"
echo "2. フロントエンド: cd frontend && npm run dev"
echo ""
echo "📱 アクセス先："
echo "- フロントエンド: http://localhost:3000"
echo "- Rails API: http://localhost:3001"
echo "- PostgreSQL: localhost:5432" 