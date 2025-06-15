# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Post.create!([
  {
    title: "初めての投稿",
    content: "これは最初のブログ投稿です。Rails APIとNext.jsの連携テストです。"
  },
  {
    title: "Docker環境での開発",
    content: "DockerでRails APIとNext.jsを連携させる方法について説明します。"
  },
  {
    title: "API設計のベストプラクティス",
    content: "RESTful APIの設計において重要なポイントをまとめました。"
  }
])

puts "#{Post.count}件の投稿を作成しました。"
