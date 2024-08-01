import type { Post } from "@prisma/client";

interface PostProps {
  Post: Post[];
}

export function PostList({ Post }: PostProps) {
  return (
    <ul className="flex flow-row gap-3 justify-center">
      {Post.map((post) => (
        <li className="border border-primary p-4 rounded-lg" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </li>
      ))}
    </ul>
  );
}
