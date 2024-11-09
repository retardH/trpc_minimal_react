import { trpc } from "./lib/trpc";

const Posts = () => {
  const { data } = trpc.getAllPosts.useQuery();
  return (
    <div>
      Posts
      <ul>
        {data?.posts.map((post) => (
          <li key={post.id}>
            <div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
