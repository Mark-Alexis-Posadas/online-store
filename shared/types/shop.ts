export type ProductCategory =
  | "Noodles"
  | "Beverages"
  | "Coffee/Sugar"
  | "Snacks"
  | "Condiments";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  stock: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}
