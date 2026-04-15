import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: {
      id: string;
      email: string;
      emailVerified: Date | null;
      role: "admin" | "user";
      image: string | null;
    };
  }
}
