import z from "zod";
import { mergeRouters, publicProcedure, router } from "../trpc";
import postsRouter from "./postsRouter";

const indexRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z
        .object({
          name: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? "world"}`,
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
  random: publicProcedure.query(() => {
    return {
      number: Math.random(),
    };
  }),
});

const appRouter = mergeRouters(indexRouter, postsRouter);

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
export default appRouter;
