import type { CartItem, Product, ProductCategory } from "@/shared/types/shop";

export interface ProductFormData {
  name: string;
  price: number | string;
  category: ProductCategory;
  stock: number | string;
  image: string;
}

export interface InventoryTableProps {
  products: Product[];
  onAddClick: () => void;
  onEditClick: (product: Product) => void;
  onDeleteClick: (id: number) => void;
}

export interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductFormData) => void;
  editingProduct?: Product | null;
}

export interface ShopViewProps {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  updateCartQuantity: (id: number, amount: number) => void;
  handleCheckout: () => void;
}
