import { route, type RouteConfig, index } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/events/:eventId", "routes/event.tsx"),
  route("/events/:eventId.ics", "routes/event.ics.tsx"),
  route("/auth/register", "routes/auth.register.tsx"),
  route("/auth/confirmation", "routes/auth.confirmation.tsx"),
] satisfies RouteConfig;
