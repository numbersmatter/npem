import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("protected", "routes/protected.tsx"),
  route("sign-up", "routes/auth/sign-up.tsx"),
] satisfies RouteConfig;
