import client from "./client";

client.use({
  onRequest({ request }) {
    request.headers.set("Authorization", `Bearer ${process.env.STRAPI_API_TOKEN}`);
  },
});

export default client;
