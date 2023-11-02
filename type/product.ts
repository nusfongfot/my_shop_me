export interface Product {
  pro_id: number;
  title: string;
  description: string;
  stock: number;
  price: number;
  category: string;
  brand: string;
  image: string;
  rating?: number;
  thumbnail?: string;
  qty?: number;
  discountPercentage?: number;
}
