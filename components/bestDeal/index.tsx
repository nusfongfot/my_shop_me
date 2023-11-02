import { Container } from "@mui/material";
import HeaderDeals from "./header";
import Products from "./products";
import { getProducts } from "@/api/products";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/zustand/product";
import BackDropLoading from "../backDrop";
import { useRouter } from "next/router";

export default function BestDeals() {
  const router = useRouter();
  const { setProducts } = useProductsStore();
  const [isLoding, setIsLoading] = useState(false);
  
  const getProductsApi = async () => {
    try {
      setIsLoading(true);
      const res = await getProducts(0, 8);
      const newData = res.products.map((item: any) => {
        return {
          ...item,
          qty: 1,
        };
      });

      if (res?.res_code === "0000") {
        setProducts(newData);
      }
    } catch (error: any) {
      console.log("err", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (router.pathname === "/") {
      getProductsApi();
    }
  }, []);
  return (
    <Container maxWidth="xl">
      {isLoding && <BackDropLoading loading={isLoding} />}
      <HeaderDeals />
      <Products />
    </Container>
  );
}
