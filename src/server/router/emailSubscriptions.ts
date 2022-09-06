import * as trpc from "@trpc/server";
import { type } from "os";
import * as z from "zod";
import { createRouter } from "./context";

type;

export const emailSubscriptions = createRouter().mutation("subscribe", {
  // using zod schema to validate and infer input values
  input: z.string(),
  async resolve({ input, ctx }) {
    // Here some login stuff would happen
    await ctx.prisma.subscribers.create({
      data: {
        email: input,
      },
    });
    return;
  },
});
