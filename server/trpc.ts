import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import prisma from "./db";

// create context function for trpc at runtime
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res, prisma });

type Context = inferAsyncReturnType<typeof createContext>;

const trpc = initTRPC.context<Context>().create();
const router = trpc.router;
const publicProcedure = trpc.procedure; // base procedure
const mergeRouters = trpc.mergeRouters;

export { router, publicProcedure, mergeRouters, createContext };
