"use client";

import api from "@/config/api";
import { useSession } from "@/context/SessionProvider";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type CartContextType = {
  cartCount: number;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);

  const { session } = useSession();

  const refreshCart = async () => {
    try {
      // Guest user
      if (!session) {
        const guestCart = JSON.parse(localStorage.getItem("guestCart") || "[]");

        const count = guestCart.reduce(
          (total: number, item: any) => total + item.quantity,
          0,
        );

        setCartCount(count);
        return;
      }

      // Logged user
      const res = await api.get("/cart/my-cart");

      const items = res?.data?.data?.items || [];

      const count = items.reduce(
        (total: number, item: any) => total + item.quantity,
        0,
      );

      setCartCount(count);
    } catch (error) {
      console.error(error);
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCart();
  }, [session]);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
