import { useCartStore, useProductsStore } from "@/zustand/product";
import ProductService from "@/components/service-ui/products";

export default function Products() {
  const { products } = useProductsStore();
  return (
    <div>
      <ProductService data={products} />
    </div>
  );
}
