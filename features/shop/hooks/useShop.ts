"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { initialProducts } from "@/features/inventory/data/initial-products";
import type { CartItem, Product } from "@/shared/types/shop";

interface UseShopReturn {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (id: number, amount: number) => void;
  handleCheckout: () => void;
}

export function useShop(): UseShopReturn {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "products",
    initialProducts,
  );

  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  const addToCart = (product: Product): void => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      if (existing.quantity >= product.stock) {
        alert("Out of stock!");
        return;
      }

      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
      return;
    }

    setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
  };

  const updateCartQuantity = (id: number, amount: number): void => {
    const product = products.find((item) => item.id === id);

    if (!product) return;

    setCart((prevCart) =>
      prevCart.flatMap((item) => {
        if (item.id !== id) {
          return [item];
        }

        const newQty = item.quantity + amount;

        if (newQty <= 0) {
          return [];
        }

        if (newQty > product.stock) {
          return [item];
        }

        return [{ ...item, quantity: newQty }];
      }),
    );
  };

  const handleCheckout = (): void => {
    setProducts((prevProducts) =>
      prevProducts.map((item) => {
        const cartItem = cart.find((cartEntry) => cartEntry.id === item.id);

        return cartItem
          ? {
              ...item,
              stock: Math.max(0, item.stock - cartItem.quantity),
            }
          : item;
      }),
    );

    setCart([]);
    alert("Salamat sa Pagbili! 🎉 Stock levels updated successfully.");
  };

  return {
    products,
    cart,
    addToCart,
    updateCartQuantity,
    handleCheckout,
  };
}
