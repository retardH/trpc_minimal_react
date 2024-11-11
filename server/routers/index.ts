import { mergeRouters } from "../trpc";
import setupRouter from "./setupRouter";
import jobPostRouter from "./jobPostRouter";

const appRouter = mergeRouters(setupRouter, jobPostRouter);

// export only the type definition of the API
// None of the actual implementation is exposed to the client
export type AppRouter = typeof appRouter;
export default appRouter;
