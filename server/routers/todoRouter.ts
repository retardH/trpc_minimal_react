import z from "zod";
import { publicProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

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

const createSchema = z.object({
  title: z.string(),
  done: z.boolean().default(false),
});

const updateSchema = createSchema.extend({
  id: z.string(),
});

// Router definition
const postsRouter = router({
  getPostById: publicProcedure // query procedure
    // This is the input schema of your procedure
    .input(z.string())
    .query(({ ctx, input }) => {
      // This is what you're returning to your client
      return {
        post: DUMMY_POSTS.find((post) => post.id === input),
      };
    }),
  createNewPost: publicProcedure // mutation procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(({ input }) => {
      if (DUMMY_POSTS.length >= 5) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You can only create 5 posts",
        });
      }
      DUMMY_POSTS.push({
        id: `${DUMMY_POSTS.length + 1}`,
        ...input,
      });

      return {
        newPost: {
          id: `${DUMMY_POSTS.length + 1}`,
          ...input,
        },
      };
    }),
});

export default postsRouter;
