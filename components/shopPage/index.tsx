import { getCate, getProducts, searchProducts } from "@/api/products";
import Header1 from "../header/header1";
import { useEffect, useState } from "react";
import { Box, Container, Grid, Stack } from "@mui/material";
import SideBar from "./sidebar";
import Products from "./prodcuts";
import { useCateStore } from "@/zustand/cate";
import { useProductsStore } from "@/zustand/product";
import ProductsShop from "./prodcuts";
import PaginationService from "../service-ui/padination";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import { useRouter } from "next/router";

export default function Shop() {
  const router = useRouter();
  const valueSearch = router.query.q;

  const { setCates, cates } = useCateStore();
  const { setProducts, products } = useProductsStore();
  const [type, setType] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const getProductsApi = async (page: number, total: number) => {
    if (valueSearch) return;  
    const res = await getProducts(page, total);
    const newData = res.products.map((item: any) => {
      return {
        ...item,
        qty: 1,
      };
    });
    setCount(res.total);
    setProducts(newData);
  };

  const getCateByAPI = async () => {
    const res = await getCate();
    setCates(res);
  };

  const handleChangePageApi = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const getProductsBySearchBar = async () => {
    if (valueSearch) {
      const { products, total } = await searchProducts(valueSearch as string);
      setProducts(products);
      setCount(total);
    }
  };

  useEffect(() => {
    getCateByAPI();
  }, []);

  useEffect(() => {
    getProductsApi(page, 6);
  }, [page]);

  useEffect(() => {
    getProductsBySearchBar();
  }, [valueSearch]);

  return (
    <Container maxWidth="xl">
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={type} />
      </Box>

      <Grid container>
        <Grid item xs={12} lg={3}>
          <SideBar
            setCount={setCount}
            getProductsApi={() => getProductsApi(1, 6)}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} lg={9}>
          <ProductsShop
            getProductsApi={() => getProductsApi(1, 6)}
            setCount={setCount}
          />
          <Stack flexDirection={"row"} justifyContent={"center"} mb={3}>
            {products.length != 0 && (
              <PaginationService
                count={count}
                itemsPerPage={6}
                onChange={(e: any, newPage: any) =>
                  handleChangePageApi(e, newPage)
                }
                page={page}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
