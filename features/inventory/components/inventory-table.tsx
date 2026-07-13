import { Package, Plus, Edit2, Trash2 } from "lucide-react";

export default function InventorTable({
  products,
  onAddClick,
  onEditClick,
  onDeleteClick,
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 transition-colors">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Package className="text-purple-600" /> Owner Dashboard & Stock
            Control
          </h2>
          <p className="text-xs text-gray-400">
            Add, edit, or refill your sari-sari store inventory items.
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-1 shadow-sm ml-auto sm:ml-0"
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-700">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900 border-b dark:border-gray-700 text-gray-500">
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock Level</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors"
              >
                <td className="p-4 flex items-center gap-3">
                  <span className="text-2xl bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                    {product.image}
                  </span>
                  <span className="font-semibold">{product.name}</span>
                </td>
                <td className="p-4">
                  <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 px-2.5 py-1 rounded-full text-xs font-semibold">
                    {product.category}
                  </span>
                </td>
                <td className="p-4 font-bold text-gray-700 dark:text-gray-200">
                  ₱{product.price}
                </td>
                <td className="p-4">
                  <span
                    className={`font-bold px-2 py-1 rounded-lg text-xs ${product.stock === 0 ? "bg-red-100 text-red-600" : product.stock < 5 ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
                  >
                    {product.stock} units
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => onEditClick(product)}
                    className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-lg inline-flex"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => onDeleteClick(product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg inline-flex"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
