"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    return {
      ok: false,
      message: "No tienes permisos para cambiar el rol de un usuario",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: { id: userId },
      data: {
        role: newRole,
      },
    });

    revalidatePath(`/admin/users`);

    return {
      ok: true,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "Error al cambiar el rol de un usuario",
    };
  }
};
