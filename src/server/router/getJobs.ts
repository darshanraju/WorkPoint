import * as z from "zod";
import { createRouter } from "./context";

export const getJobs = createRouter().mutation("getJobs", {
  input: z.boolean(),
  async resolve({ ctx }) {
    return await ctx.prisma.jobPost.findMany();
  },
});
