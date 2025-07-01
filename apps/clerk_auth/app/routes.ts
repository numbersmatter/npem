import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-up", "routes/auth/sign-up.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("protected", "routes/protected.tsx"),
] satisfies RouteConfig;
