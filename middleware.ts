import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Definește rutele publice care nu necesită autentificare:
 * - login / signup
 * - webhook-uri sau alte API-uri publice
 */
const publicRoutes = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
  '/api/public(.*)',
]);

/**
 * Middleware principal
 * Protejează toate rutele care nu sunt publice
 */
export default clerkMiddleware(async (auth, req) => {
  // Log pentru debug
  console.log(`[Clerk Middleware] Request URL: ${req.url}`);

  if (!publicRoutes(req)) {
    try {
      await auth.protect(); // protecție server-side
      console.log('[Clerk Middleware] Access granted');
    } catch (error) {
      console.warn('[Clerk Middleware] Access denied, redirecting to /sign-in');
      // Redirecționează către pagina de login
      return Response.redirect(
        '/sign-in?redirect_url=' + encodeURIComponent(req.url),
        302
      );
    }
  } else {
    console.log('[Clerk Middleware] Public route, no auth needed');
  }
});

/**
 * Config: matcher pentru toate rutele care trebuie interceptate
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // exclude resurse statice
  ],
};
