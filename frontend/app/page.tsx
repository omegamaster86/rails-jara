'use client';

import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [isCreating, setIsCreating] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/v1/posts`);
      if (!response.ok) {
        throw new Error('投稿の取得に失敗しました');
      }
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '不明なエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    setIsCreating(true);
    try {
      const response = await fetch(`${API_URL}/api/v1/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ post: newPost }),
      });

      if (!response.ok) {
        throw new Error('投稿の作成に失敗しました');
      }

      const createdPost = await response.json();
      setPosts([createdPost, ...posts]);
      setNewPost({ title: '', content: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '投稿作成エラー');
    } finally {
      setIsCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">エラー: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ブログ投稿</h1>
        
        {/* 新規投稿フォーム */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">新しい投稿を作成</h2>
          <form onSubmit={createPost} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                タイトル
              </label>
              <input
                type="text"
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="投稿のタイトルを入力"
                required
              />
            </div>
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                内容
              </label>
              <textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="投稿の内容を入力"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isCreating}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isCreating ? '作成中...' : '投稿を作成'}
            </button>
          </form>
        </div>

        {/* 投稿一覧 */}
        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              投稿がありません
            </div>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4 whitespace-pre-wrap">
                  {post.content}
                </p>
                <div className="text-sm text-gray-500 flex justify-between">
                  作成日: {new Date(post.created_at).toLocaleDateString('ja-JP')}
                  <button className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600">削除</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
