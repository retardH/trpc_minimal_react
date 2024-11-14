import z from "zod";
import { publicProcedure, router } from "../trpc";

const setupRouter = router({
  greetings: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return {
        text: `Hello ${input.name}!`,
      };
    }),
  getJobTypes: publicProcedure.query(() => {
    return {
      data: ["Full-time", "Part-time", "Remote", "Hybrid"],
    };
  }),
  random: publicProcedure.query(() => {
    return {
      number: Math.random(),
    };
  }),
});
export default setupRouter;
