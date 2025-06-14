import { type RouteConfig, index, layout, prefix, route } from "@react-router/dev/routes";

export default [
  index("routes/landing.tsx"),
  route("login", "routes/login/login.tsx"),
  route("sign-up", "routes/login/sign-up.tsx"),
  route("logout", "routes/login/logout.tsx"),
  route("update-password", "routes/auth/update_password.tsx"),
  route("forgot-password", "routes/auth/forgot_password.tsx"),
  route("auth/confirm", "routes/auth/auth_confirm.tsx"),
  route("auth/auth-code-error", "routes/auth/auth_error.tsx"),
  route("auth/error", "routes/auth/auth_error.tsx"),
  layout("routes/layouts/main_layout.tsx", [
    route("protected", "routes/protected.tsx"),
  ]),
] satisfies RouteConfig;
