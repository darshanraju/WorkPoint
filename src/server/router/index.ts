// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { emailSubscriptions } from "./emailSubscriptions";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(emailSubscriptions);
// export type definition of API
export type AppRouter = typeof appRouter;
