import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Define rutele publice care NU trebuie protejate
 * - pagina de login / signup
 * - API-uri publice (ex: webhook Stripe)
 */
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
  '/api/public(.*)', // eventuale alte API-uri publice
]);

/**
 * Middleware-ul principal
 * Protejează toate rutele care NU sunt publice
 */
export default clerkMiddleware(async (auth, req) => {
  console.log('Middleware called for:', req.url);

  if (!isPublicRoute(req)) {
    try {
      await auth.protect(); // folosește CLERK_SECRET_KEY server-side
    } catch (err) {
      console.error('Auth protect failed:', err);
      throw err; // aruncă eroarea ca să vezi exact ce merge prost
    }
  }
});

/**
 * Config: matcher pentru toate rutele care trebuie interceptate
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)', // exclude resurse statice Next.js
  ],
};
