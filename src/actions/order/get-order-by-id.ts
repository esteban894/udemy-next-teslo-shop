"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "No tienes acceso a esta orden",
    };
  }

  try {
    const order = await prisma.order.findUnique({
      where: { id: id },
      include: {
        orderAddress: true,
        orderItems: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                slug: true,
                title: true,
                productImages: {
                  select: {
                    url: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) throw `${id} no existe - 404`;

    if (session.user.role === "user") {
      if (session.user.id !== order.userId) {
        throw `${id} no pertenece a este usuario`;
      }
    }

    return {
      ok: true,
      order: order,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Orden no existe",
    };
  }
};
