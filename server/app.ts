/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import express from "express";
import appRouter from "./routers";
import prisma from "./db";

// Bootstrap an express app
const app = express();
app.use(express.json());
app.use(cors());

// create context function for trpc at runtime
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res, prisma });

// use trpc adapter for express
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;

export { createContext };

// create server
// createHTTPServer({
//   middleware: cors(),
//   router: appRouter,
//   createContext() {
//     console.log("context 3");
//     return {};
//   },
// }).listen(2022);
