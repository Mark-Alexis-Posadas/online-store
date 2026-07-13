import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { categories } from "../utils/initialProducts";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  editingProduct,
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "Snacks",
    stock: "",
    image: "📦",
  });

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData({
        name: "",
        price: "",
        category: "Snacks",
        stock: "",
        image: "📦",
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 max-w-md w-full rounded-2xl shadow-xl overflow-hidden text-sm">
        <div className="px-6 py-4 border-b dark:border-gray-700 flex justify-between items-center">
          <h3 className="font-bold text-lg">
            {editingProduct ? "📝 Edit Paninda" : "➕ Bagong Paninda"}
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700"
              placeholder="e.g., Piattos Cheese"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Price (₱)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full p-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Stock Level</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full p-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700"
                min="0"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700"
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Emoji Icon</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="w-full p-2 border rounded-xl dark:bg-gray-900 dark:border-gray-700 text-center"
                maxLength={2}
              />
            </div>
          </div>

          <div className="pt-4 flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
