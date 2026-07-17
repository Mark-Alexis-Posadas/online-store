import React, { useState } from "react";
import { Search, ShoppingBag, ShoppingCart, Check } from "lucide-react";
import { categories } from "@/features/inventory/data/initial-products";
import type { ShopViewProps } from "@/features/type";

export default function ShopView({
  products,
  cart,
  addToCart,
  updateCartQuantity,
  handleCheckout,
}: ShopViewProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof categories)[number]>("All");

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Search & Category Badges */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Maghanap ng paninda..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs rounded-full font-medium transition-all ${selectedCategory === cat ? "bg-orange-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm flex flex-col justify-between group border border-transparent hover:border-orange-200 dark:hover:border-orange-900 transition-all"
            >
              <div>
                <div className="text-4xl my-2 text-center transform group-hover:scale-110 transition-transform">
                  {product.image}
                </div>
                <span className="text-[10px] font-bold uppercase bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full">
                  {product.category}
                </span>
                <h3 className="font-semibold text-sm mt-2 line-clamp-2">
                  {product.name}
                </h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-lg font-black text-orange-600 dark:text-orange-400">
                    ₱{product.price}
                  </span>
                  <span
                    className={`text-xs ${product.stock > 5 ? "text-gray-400" : "text-red-500 font-bold"}`}
                  >
                    {product.stock > 0
                      ? `${product.stock} left`
                      : "Out of Stock"}
                  </span>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  disabled={product.stock <= 0}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white py-2 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1"
                >
                  <ShoppingCart size={14} /> Add to Basket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shopping Basket Sidebar */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm h-fit sticky top-24 border dark:border-gray-700">
        <div className="flex items-center gap-2 border-b dark:border-gray-700 pb-3 mb-4">
          <ShoppingBag className="text-orange-500" />
          <h2 className="text-lg font-bold">Bayaran Basket</h2>
          <span className="ml-auto bg-orange-100 text-orange-600 text-xs px-2.5 py-0.5 rounded-full font-bold">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-sm">
            Empty basket. Pabili po! 🛒
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 text-sm bg-gray-50 dark:bg-gray-900 p-2 rounded-xl"
                >
                  <div className="flex items-center gap-2 truncate">
                    <span>{item.image}</span>
                    <div className="truncate">
                      <h4 className="font-medium truncate">{item.name}</h4>
                      <span className="text-xs text-gray-400">
                        ₱{item.price} each
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="w-6 h-6 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold text-xs">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="w-6 h-6 rounded-md bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-gray-700 mt-4 pt-4 space-y-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount:</span>
                <span className="text-red-500">₱{totalCartPrice}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2"
              >
                <Check size={18} /> Checkout (Abot Bayad)
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
