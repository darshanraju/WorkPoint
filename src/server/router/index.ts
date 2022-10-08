// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { emailSubscriptions } from "./emailSubscriptions";
import { postJob } from "./postJob";
import { generateDirectUploadUrl } from "./generateDirectUploadUrl";
import { getJobs } from "./getJobs";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge(emailSubscriptions)
  .merge(postJob)
  .merge(generateDirectUploadUrl)
  .merge(getJobs);

// export type definition of API
export type AppRouter = typeof appRouter;
