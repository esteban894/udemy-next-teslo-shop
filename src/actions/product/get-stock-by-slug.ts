"use server";

import prisma from "@/lib/prisma";
// import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string) => {
  try {
    // await sleep(3);
    const stock = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug: slug,
      },
    });

    if (!stock) return 0;
    return stock.inStock;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener el stock del producto");
  }
};
