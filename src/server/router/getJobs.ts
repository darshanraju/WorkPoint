import * as z from "zod";
import { createRouter } from "./context";

export const getJobs = createRouter().mutation("getJobs", {
  // using zod schema to validate and infer input values
  input: z.boolean(),
  async resolve({ input, ctx }) {
    // Here some login stuff would happen
    return await ctx.prisma.jobPost.findMany();

    // .create({
    //   data: {
    //     Title: input.jobTitle,
    //     Company: input.company,
    //     PrimaryJobTag: input.primaryJobTag,
    //     Level: input.jobLevel,
    //     JobCity: input.jobCity,
    //     JobCountry: input.jobCountry,
    //     ApplyLink: input.jobLink,
    //     Description: input.jobDescription,
    //     Benefits: input.benefits.join(","),
    //     CompanyAddress: input.companyAddressInvoice,
    //     CompanyCity: input.companyCityInvoice,
    //     CompanyCountry: input.companyCountryInvoice,
    //     CompanyEmail: input.companyEmailInvoice,
    //     CompanyLogo: input.companyLogo,
    //     Feedback: input.feedback,
    //     PostDuration: input.jobPostDuration,
    //   },
    // });
  },
});
