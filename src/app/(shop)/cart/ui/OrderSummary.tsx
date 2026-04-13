"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useShallow } from "zustand/react/shallow";

export const OrderSummary = () => {
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSummaryInformation()),
  );

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart} artículos</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="mt-5 text-2xl">Total: </span>
      <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
    </div>
  );
};
