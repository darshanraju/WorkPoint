import * as z from "zod";
import { createRouter } from "./context";

export const postJob = createRouter().mutation("postJob", {
  // using zod schema to validate and infer input values
  input: z.object({
    jobTitle: z.string(),
    company: z.string(),
    primaryJobTag: z.string(),
    jobLevel: z.string(),
    jobCity: z.string(),
    jobCountry: z.string(),
    jobLink: z.string(),
    jobDescription: z.string(),
    jobPostDuration: z.string(),
    benefits: z.array(z.string()),
    companyEmailInvoice: z.string(),
    companyAddressInvoice: z.string(),
    companyCityInvoice: z.string(),
    companyCountryInvoice: z.string(),
    companyLogo: z.string(),
    feedback: z.string(),
  }),
  async resolve({ input, ctx }) {
    // Here some login stuff would happen
    await ctx.prisma.jobPost.create({
      data: {
        Title: input.jobTitle,
        Company: input.company,
        PrimaryJobTag: input.primaryJobTag,
        Level: input.jobLevel,
        JobCity: input.jobCity,
        JobCountry: input.jobCountry,
        ApplyLink: input.jobLink,
        Description: input.jobDescription,
        Benefits: input.benefits.join(","),
        CompanyAddress: input.companyAddressInvoice,
        CompanyCity: input.companyCityInvoice,
        CompanyCountry: input.companyCountryInvoice,
        CompanyEmail: input.companyEmailInvoice,
        CompanyLogo: input.companyLogo,
        Feedback: input.feedback,
        PostDuration: input.jobPostDuration,
      },
    });
    return;
  },
});
