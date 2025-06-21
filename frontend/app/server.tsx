import { Post } from '@/app/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_URL}/api/v1/posts`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      throw new Error('投稿の取得に失敗しました');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Posts fetch error:', error);
    return [];
  }
} 