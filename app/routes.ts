import { route, type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/events/:eventId", "routes/event.tsx"),
  route("/events/:eventId.ics", "routes/event.ics.tsx"),
  route("/suggest-event", "routes/suggest-event.tsx"),

  ...prefix("/auth", [
    route("/login", "routes/auth.login.tsx"),
    route("/logout", "routes/auth.logout.tsx"),
    route("/register", "routes/auth.register.tsx"),
    route("/confirmation", "routes/auth.confirmation.tsx"),
  ]),
] satisfies RouteConfig;
