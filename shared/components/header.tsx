import { Sun, Moon, Package } from "lucide-react";

export default function Header({ view, setView, darkMode, setDarkMode }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-800/80 border-b border-gray-200 dark:border-gray-700 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl animate-bounce">🏪</span>
          <div>
            <h1 className="text-2xl font-black bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Aling Nena's Digital Sari-Sari
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Open 24/7 • Fresh Local Stocks
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setView("shop")}
            className={`px-4 py-2 rounded-xl font-medium transition-all transform active:scale-95 text-sm ${view === "shop" ? "bg-orange-500 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
          >
            🛒 Buyer Shop
          </button>
          <button
            onClick={() => setView("admin")}
            className={`px-4 py-2 rounded-xl font-medium transition-all transform active:scale-95 text-sm flex items-center gap-1 ${view === "admin" ? "bg-purple-600 text-white shadow-md" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"}`}
          >
            <Package size={16} /> Tindahan Inventory
          </button>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-gray-200 dark:bg-gray-700 hover:opacity-80 transition-all text-orange-500 dark:text-yellow-400"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
