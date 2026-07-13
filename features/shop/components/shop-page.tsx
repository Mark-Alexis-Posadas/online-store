"use client";

import { useState, useEffect } from "react";
import { useShop } from "../hooks/useShop";
import Header from "@/shared/components/header";
import ShopView from "./shop-view";

const ShopPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { products, cart, addToCart, updateCartQuantity, handleCheckout } =
    useShop();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <ShopView
          products={products}
          cart={cart}
          addToCart={addToCart}
          updateCartQuantity={updateCartQuantity}
          handleCheckout={handleCheckout}
        />
      </main>
    </div>
  );
};

export default ShopPage;
