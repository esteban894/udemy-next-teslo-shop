import type { NextAuthConfig } from "next-auth";

// IMPORTANT: Edge-runtime safe config.
// This file is imported by `middleware.ts`, so avoid Prisma/DB and Node-only modules here.
const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      console.log({ auth });
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/checkout");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return true; // Response.redirect(new URL("/checkout/address", nextUrl));
      }
      return true;
    },

    async jwt({ token, user }) {
      if (!user) return token;
      type TokenWithUser = typeof token & { user?: unknown };
      const nextToken = token as TokenWithUser;
      nextToken.user = user;
      return nextToken;
    },

    async session({ session, token }) {
      const tokenUser = (token as { user?: unknown })?.user;
      if (tokenUser) session.user = tokenUser as typeof session.user;
      return session;
    },
  },
  // NextAuthConfig requires `providers`, but in Edge we keep it empty and override
  // providers in `src/auth.ts` (Node runtime).
  providers: [],
} satisfies NextAuthConfig;

export default authConfig;
