import type { User } from "@/generated/prisma/client";

export type ProfileUserFields = Pick<
  User,
  "id" | "name" | "email" | "role" | "image" | "emailVerified"
>;
