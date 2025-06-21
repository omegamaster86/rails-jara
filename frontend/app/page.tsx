import { getPosts } from './server';
import ClientHome from '@/app/client-home';

export default async function Home() {
  const initialPosts = await getPosts();
  
  return <ClientHome initialPosts={initialPosts} />;
}
