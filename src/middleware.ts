// src/middleware.ts (or middleware.ts at project root)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define your protected routes
// Use '/*' to match the base path and any dynamic segments or sub-paths
const protectedRoutes = [
  '/dashboard',
  '/settings',
  '/profile',
  '/clients',
  '/clients/:path*', 
];

const publicRoutes = ['/login', '/register', '/']; // Routes accessible without login

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isLoggedIn = request.cookies.get('logged_in')?.value === 'true'; // Get cookie from request

  // --- Authentication Check ---

  // If the user is logged in and tries to access a public route (like login/register),
  // redirect them to the dashboard.
  if (isLoggedIn && publicRoutes.includes(path)) {
    return NextResponse.redirect(new URL('/clients', request.url));
  }

  // Check if the current path starts with any of the protected routes.
  // This is a simple check; for more complex matching, you might use a regex or a more sophisticated utility.
  const isProtectedRoute = protectedRoutes.some(route => {
    // Convert the protected route pattern to a regex for matching
    // Replace ':path*' with a regex that matches anything
    const pattern = new RegExp(`^${route.replace(/\/:path\*/, '(/.*)?')}$`);
    return pattern.test(path);
  });

  // If the user is NOT logged in and tries to access a protected route,
  // redirect them to the login page.
  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // --- Authorization Check (Optional, but often needed for dynamic routes) ---
  // This part is more complex and depends on your specific authorization logic.
  // For example, if you need to check if the logged-in user has access to `clients/123`

  // Example: Extract client ID from the path
  // const clientIdMatch = path.match(/^\/clients\/(\d+)/); // Matches /clients/123 and captures 123
  // if (isLoggedIn && clientIdMatch && clientIdMatch[1]) {
  //   const clientId = clientIdMatch[1];
  //   // Here, you would typically make an API call to your backend
  //   // or check a decoded JWT token to see if the current user
  //   // is authorized to view this specific clientId.
  //   // This might involve a server-side fetch from middleware.
  //   // const isAuthorized = await checkUserAuthorization(request.cookies.get('token')?.value, clientId);
  //   // if (!isAuthorized) {
  //   //   return NextResponse.redirect(new URL('/unauthorized', request.url));
  //   // }
  // }


  // Allow the request to proceed if no redirect is needed
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Include all paths except API routes, static files, etc.
    // This pattern is crucial for catching dynamic segments.
    // It says: Match everything that doesn't start with _next/static, _next/image, api, or favicon.ico
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    // Alternatively, for more specific control, list all paths:
    // '/dashboard/:path*',
    // '/settings/:path*',
    // '/profile/:path*',
    // '/clients/:path*', // Explicitly include the dynamic client path
    // '/login',
    // '/register',
    // '/'
  ],
};