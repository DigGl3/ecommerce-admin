import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware((auth, req) => {
  if (req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/api")) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|sign-in|sign-up).*)",
  ],
};
