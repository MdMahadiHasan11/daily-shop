// Routes that require the user to be logged in
export const PROTECTED_ROUTES = [
  "/my-account",
  "/checkout",
  "/orders",
  "/dashboard",
];

// Routes that logged-in users should NOT see (e.g., login, register)
export const AUTH_ROUTES = ["/login", "/register"];
