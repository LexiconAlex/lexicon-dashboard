import { PrismaClient } from "@prisma/client";
import { PostList } from "@/components/Post";

const prisma = new PrismaClient();

export default async function Home() {
  const Post = await prisma.post.findMany();
  return (
    <div className="text-center text-primary">
      <h1 className="text-3xl font-bold mb-4">Lexicon Dashboard</h1>
      <PostList Post={Post} />
    </div>
  );
}
