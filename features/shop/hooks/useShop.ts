"use client";

import { useLocalStorage } from "@/shared/hooks/use-local-storage";
import { initialProducts } from "@/features/inventory/data/initial-products";
import { Product, CartItem } from "@/shared/types/shop";

export function useShop() {
  const [products, setProducts] = useLocalStorage<Product[]>(
    "products",
    initialProducts,
  );

  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);

  const addToCart = (product: Product) => {
    const existing = cart.find((item: CartItem) => item.id === product.id);

    if (existing) {
      if (existing.quantity >= product.stock) {
        return alert("Out of stock!");
      }

      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (id: number, amount: number) => {
    const product = products.find((p) => p.id === id);

    if (!product) return;

    setCart(
      cart
        .map((item): CartItem | null => {
          if (item.id === id) {
            const newQty = item.quantity + amount;

            if (newQty <= 0) return null;
            if (newQty > product.stock) return item;

            return {
              ...item,
              quantity: newQty,
            };
          }

          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const handleCheckout = () => {
    setProducts(
      products.map((p) => {
        const cartItem = cart.find((item) => item.id === p.id);

        return cartItem
          ? {
              ...p,
              stock: Math.max(0, p.stock - cartItem.quantity),
            }
          : p;
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
