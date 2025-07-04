import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  route("sign-up", "routes/auth/sign-up.tsx"),
  route("login", "routes/auth/login.tsx"),
  layout("routes/stacked_layout.tsx", [
    index("routes/apply/apply_welcome.tsx"),
    route("profile", "routes/profile/profile_page.tsx"),
  ]),
] satisfies RouteConfig;
