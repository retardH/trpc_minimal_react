import z from "zod";
import { publicProcedure, router } from "../trpc";

type Post = {
  id: string;
  title: string;
  content: string;
};
const DUMMY_POSTS: Array<Post> = [
  {
    id: "1",
    title: "Post 1",
    content: "This is the content of post 1",
  },
  {
    id: "2",
    title: "Post 2",
    content: "This is the content of post 2",
  },
  {
    id: "3",
    title: "Post 3",
    content: "This is the content of post 3",
  },
];

const postsRouter = router({
  getPostById: publicProcedure
    // This is the input schema of your procedure
    .input(z.string())
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        post: DUMMY_POSTS.find((post) => post.id === input),
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
  getAllPosts: publicProcedure.query(() => {
    return {
      posts: DUMMY_POSTS,
    };
  }),
});

export default postsRouter;
