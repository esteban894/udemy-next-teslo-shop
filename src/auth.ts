import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcryptjs from "bcryptjs";

import authConfig from "./auth.config";
import prisma from "./lib/prisma";

const fullConfig = {
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        });

        if (!user) return null;

        if (!bcryptjs.compareSync(password, user.password)) return null;

        const { password: _password, ...rest } = user;
        void _password;
        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { auth, signIn, signOut, handlers } = NextAuth(fullConfig);

