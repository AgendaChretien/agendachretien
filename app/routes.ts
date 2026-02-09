import { route, type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/events/:eventId", "routes/event.tsx"),
] satisfies RouteConfig;
