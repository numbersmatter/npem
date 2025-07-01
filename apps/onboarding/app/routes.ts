import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("sign-up", "routes/auth/sign-up.tsx"),
  route("login", "routes/auth/login.tsx"),
  route("protected", "routes/protected.tsx"),
  ...prefix("test", [
    layout("routes/layout.tsx", [index("routes/apply_welcome.tsx")]),
  ]),
] satisfies RouteConfig;
