import { GraphQLClient } from "graphql-request";

const client = new GraphQLClient(process.env.API_ENDPOINT || "");

export default client;
