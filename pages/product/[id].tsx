"use client";
import { getProduct } from "@/api/products";
import Header1 from "@/components/header/header1";
import ProductDetails from "@/components/productDetail";
import { Product } from "@/type/product";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<Product>();

  const getDetailsProduct = async () => {
    if (router.isReady) {
      const res = await getProduct(id);
      setProduct(res);
    }
  };

  useEffect(() => {
    getDetailsProduct();
  }, [router?.query?.id]);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
