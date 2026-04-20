import { Address } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: Address;
  setAddress: (address: Address) => void;
  deleteAddress: () => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        postalCode: "",
        city: "",
        country: "",
        phone: "",
      },

      setAddress: (address) => set({ address }),
      deleteAddress: () =>
        set({
          address: {
            firstName: "",
            lastName: "",
            address: "",
            address2: "",
            postalCode: "",
            city: "",
            country: "",
            phone: "",
          },
        }),
    }),
    {
      name: "address-storage",
    },
  ),
);
