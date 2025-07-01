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
  ...prefix("apply", [
    layout("routes/apply/layout.tsx", [
      index("routes/apply/apply_welcome.tsx"),
      route("user-profile", "routes/apply/user_profile.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
