import { createRouter } from "./context";

export const generateDirectUploadUrl = createRouter().mutation(
  "generateDirectUploadUrl",
  {
    async resolve() {
      const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`;
      const API_TOKEN = process.env.NEXT_CLOUDFLARE_API_KEY;

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        method: "POST",
      });
      const directUrlToken = await response.json();
      return {
        id: directUrlToken.result.id,
        uploadUrl: directUrlToken.result.uploadURL,
      };
    },
  }
);
