"use client";
import { getProductByIDAPI } from "@/api/products";
import BackDropLoading from "@/components/backDrop";
import Header1 from "@/components/header/header1";
import ProductDetails from "@/components/productDetail";
import { Product } from "@/type/product";
import { errorToast } from "@/utils/notification";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  const [isLoding, setIsLoading] = useState(false);
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    (async () => {
      if (router.isReady) {
        try {
          setIsLoading(true);
          const res = await getProductByIDAPI(id);
          const newData = { ...res.products[0], qty: 1 };
          if (res.res_code === "0000") {
            setProduct(newData);
          }
        } catch (error: any) {
          errorToast("Product not found", 2500);
        } finally {
          setIsLoading(false);
        }
      }
    })();
  }, [router?.query?.id]);
  return (
    <div>
      {isLoding && <BackDropLoading loading={isLoding} />}

      <ProductDetails product={product} setProduct={setProduct} />
    </div>
  );
}
