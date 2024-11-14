import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import appRouter from "./routers";
import { createContext } from "./trpc";
// Bootstrap an express app
const app = express();
app.use(express.json());
app.use(cors());

// use trpc adapter for express under /trpc namespace
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
