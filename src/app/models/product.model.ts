export interface Product {
  id: number;
  name: string;
  description: string;
  category_id: number;
  price: number;
  discount?: number;
  stock_quantity: number;
  size_options: string[];  // Ensure it's an array
  color_options: string[]; // Ensure it's an array
  image_url: string;
  state: number;
}

