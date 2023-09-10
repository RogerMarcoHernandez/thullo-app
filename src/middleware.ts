import { withAuth } from "next-auth/middleware";
import { config as authConfig } from "./lib/auth";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    // HANDLE AUTHORISED REQUESTS HERE
  },
  {
    secret: authConfig.secret,
    pages: authConfig.pages,
    callbacks: {
      authorized: ({ req }) => {
        const token = req.cookies.get("next-auth.session-token");
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/boards/:path*", "/profile/:path*"],
};
