import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/auth/*", "routes/auth_api.tsx"),
  route("protected", "routes/protected.tsx"),
] satisfies RouteConfig;
