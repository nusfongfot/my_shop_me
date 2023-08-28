import { Container } from "@mui/material";
import HeaderDeals from "./header";
import Products from "./products";
import { getProducts } from "@/api/products";
import { useEffect, useState } from "react";
import { useProductsStore } from "@/zustand/product";

export default function BestDeals() {
  const { setProducts } = useProductsStore();

  const getProductsApi = async () => {
    const res = await getProducts(0, 6);
    setProducts(res.products);
  };

  useEffect(() => {
    getProductsApi();
  }, []);
  return (
    <Container maxWidth="xl">
      <HeaderDeals />
      <Products />
    </Container>
  );
}
