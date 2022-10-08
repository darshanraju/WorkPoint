import { createRouter } from "./context";

const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.NEXT_CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`;
const API_TOKEN = process.env.NEXT_CLOUDFLARE_API_KEY;
export const uploadImage = createRouter().mutation("uploadImage", {
  async resolve() {
    const body = new FormData();
    body.append("requireSignedURLs", "true");
    body.append("", "\\");
    body.append("metadata", '{"key":"value"}');

    const response = await fetch(url, {
      body,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
      method: "POST",
    });

    const directUrlToken = await response.json();

    return {
      id: directUrlToken.result.id,
      uploadUrl: directUrlToken.result.uploadURL,
    };
  },
});
