import { Container } from "@mui/material";
import Header1 from "./header1";
import Header2 from "./header2";
import { useEffect, useState } from "react";
import { getCate } from "@/api/products";
import { useCateStore } from "@/zustand/cate";

export default function Header() {
  const { cates, setCates } = useCateStore();

  const getCateByAPI = async () => {
    const res = await getCate();
    setCates(res);
  };

  useEffect(() => {
    getCateByAPI();
  }, []);
  return (
    <Container maxWidth="xl">
      <Header1 />
      <Header2 />
    </Container>
  );
}
