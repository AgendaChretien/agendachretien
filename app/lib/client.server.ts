import createClient from "openapi-fetch";
import qs from "qs";

import type { paths } from "./openapi";

export type Paths = paths;

const strapiEndpoint = import.meta.env.VITE_STRAPI_URL;

const client = createClient<Paths>({
  baseUrl: `${strapiEndpoint}/api`,
  querySerializer: qs.stringify,
});

client.use({
  onRequest({ request }) {
    let authorization = request.headers.get("Authorization");

    if (!authorization) {
      request.headers.set("Authorization", `Bearer ${process.env.STRAPI_API_TOKEN}`);
      return;
    }

    if (!authorization.startsWith("Bearer ")) {
      request.headers.set("Authorization", `Bearer ${authorization}`);
    }
  },
});

// client.use({
//   onRequest({ request }) {
//     console.log("Request:", request);
//   },
// });

export default client;
