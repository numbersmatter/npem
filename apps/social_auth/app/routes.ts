import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("auth/callback", "routes/auth/callback.tsx"),
  route("protected", "routes/protected.tsx"),
  route("auth/auth-code-error", "routes/auth/auth_code_error.tsx"),
  route("test", "routes/test.tsx"),
] satisfies RouteConfig;
