import { Container } from "@mui/material";
import Header1 from "./header1";
import Header2 from "./header2";
import { useEffect, useState } from "react";
import { getCate } from "@/api/products";
import { useCateStore } from "@/zustand/cate";
import useAuth from "@/zustand/auth";

export default function Header() {
  return (
    <Container maxWidth="xl">
      <Header1 />
      <Header2 />
    </Container>
  );
}
