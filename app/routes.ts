import { route, type RouteConfig, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sitemap.xml", "routes/sitemap.xml.tsx"),
  route("/noop", "routes/noop.tsx"),
  route("/events/:eventId", "routes/event.tsx"),
  route("/events/:eventId.ics", "routes/event.ics.tsx"),
  route("/suggest-event", "routes/suggest-event.tsx"),
  route("/api/events", "routes/api.events.tsx"),

  ...prefix("/auth", [
    route("/login", "routes/auth.login.tsx"),
    route("/logout", "routes/auth.logout.tsx"),
    route("/register", "routes/auth.register.tsx"),
    route("/confirmation", "routes/auth.confirmation.tsx"),
    route("/forgot-password", "routes/auth.forgot-password.tsx"),
    route("/reset-password", "routes/auth.reset-password.tsx"),
  ]),
] satisfies RouteConfig;
