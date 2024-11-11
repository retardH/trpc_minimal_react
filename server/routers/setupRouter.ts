import z from "zod";
import { publicProcedure, router } from "../trpc";

const setupRouter = router({
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
