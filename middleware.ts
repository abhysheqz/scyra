import { auth } from "@/auth";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const publicPaths = ["/", "/auth/sign-in", "/auth/sign-up"];

  const isPublic = publicPaths.includes(pathname);

  if (!isPublic && !req.auth) {
    const signInUrl = new URL("/auth/sign-in", req.nextUrl.origin);
    return Response.redirect(signInUrl);
  }

  return undefined;
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|logos|icons|video|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
