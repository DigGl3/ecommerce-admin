import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook(.*)',
  '/api/public(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  console.log('=== Middleware called ===');
  console.log('URL:', req.url);
  console.log('Auth object:', auth);

  if (!isPublicRoute(req)) {
    try {
      await auth.protect();
      console.log('Auth protect success!');
    } catch (err) {
      console.error('Auth protect failed:', err);
      throw err; // aruncă eroarea ca să vedem exact ce se întâmplă
    }
  } else {
    console.log('Public route, no auth needed');
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
