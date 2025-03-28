import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes, staffRoutes } from "./routes";

const { auth } = NextAuth(authConfig)

//@ts-ignore
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isStaffRoute = nextUrl.pathname.startsWith(staffRoutes)

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn && req.auth.user.role === "USER") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null;
  }

  if (isStaffRoute) {
    // if (isLoggedIn && req.auth.user.role !== 'STAFF') { return Response.redirect(new URL("/auth/signin", nextUrl)) }
    //
  }


  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/signin", nextUrl))
  }
})


//invoke auth function with all path ~~
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
