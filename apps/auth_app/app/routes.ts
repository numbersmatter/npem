import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login/login.tsx"),
  route("sign-up", "routes/login/sign-up.tsx"),
  layout("routes/layouts/main_layout.tsx", [
    route("protected", "routes/protected.tsx"),
  ]),
] satisfies RouteConfig;
