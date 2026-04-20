"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({ page = 1, take = 10 }: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  if (isNaN(Number(take))) take = 12;
  if (take < 1) take = 12;

  const session = await auth();

  if (session?.user?.role !== "admin") {
    return {
      ok: false,
      orders: [],
      totalPages: 0,
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: (page - 1) * take,
    include: {
      orderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  const totalCount = await prisma.order.count();
  const totalPages = Math.ceil(totalCount / take);

  return {
    ok: true,
    currentPage: page,
    totalPages: totalPages,
    orders: orders,
  };
};
