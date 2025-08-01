import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("api/auth/*", "routes/auth_api.tsx"),
  route("protected", "routes/protected.tsx"),
  route("login", "routes/login.tsx"),
  layout("./routes/layout.tsx", [route("profile", "routes/profile.tsx")]),
  route("register", "routes/register.tsx"),
  route("address", "routes/address.tsx"),
] satisfies RouteConfig;
