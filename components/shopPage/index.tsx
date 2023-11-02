import { getCate, getProducts, searchProducts } from "@/api/products";
import Header1 from "../header/header1";
import { useEffect, useState } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import SideBar from "./sidebar";
import Products from "./prodcuts";
import { useCateStore } from "@/zustand/cate";
import { useProductsStore } from "@/zustand/product";
import ProductsShop from "./prodcuts";
import PaginationService from "../service-ui/padination";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import { useRouter } from "next/router";
import BackDropLoading from "../backDrop";

export default function Shop() {
  const router = useRouter();
  const valueSearch = router.query.q;

  const { setCates, cates } = useCateStore();
  const { setProducts, products } = useProductsStore();
  const [type, setType] = useState<string>("");
  const [isLoding, setIsLoading] = useState(false);

  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const getProductsApi = async (page: number, total: number) => {
    if (valueSearch) return;
    setIsLoading(true);
    try {
      const res = await getProducts(page, total);
      const newData = res.products.map((item: any) => {
        return {
          ...item,
          qty: 1,
        };
      });

      if (res.res_code === "0000") {
        setCount(res.total);
        setProducts(newData);
      }
    } catch (error: any) {
      console.log("err", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCateByAPI = async () => {
    try {
      setIsLoading(true);
      const res = await getCate();
      if (res.res_code === "0000") {
        setCates(res);
      }
    } catch (error: any) {
      console.log("err", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePageApi = (e: any, newPage: number) => {
    setPage(newPage);
  };

  const getProductsBySearchBar = async () => {
    try {
      setIsLoading(true);
      const { products, total } = await searchProducts(valueSearch as string);
      setProducts(products);
      setCount(total);
    } catch (error: any) {
      console.log("err", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCateByAPI();
  }, []);

  useEffect(() => {
    getProductsApi((page - 1) * 40, 40);
  }, [page]);

  useEffect(() => {
    if (!valueSearch) return;
    getProductsBySearchBar();
  }, [valueSearch]);

  return (
    <Container maxWidth="xl">
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={type} />
      </Box>

      <Grid container>
        <Grid item xs={12} lg={2}>
          <SideBar
            setCount={setCount}
            getProductsApi={() => getProductsApi(1, 60)}
            type={type}
            setType={setType}
          />
        </Grid>
        <Grid item xs={12} lg={10}>
          <ProductsShop
            getProductsApi={() => getProductsApi(1, 60)}
            setCount={setCount}
          />

          {products.length === 0 && (
            <Stack flexDirection={"row"} justifyContent={"center"}>
              <Typography variant="h4" sx={{ mt: 10, mb: 33 }} align="center">
                Product Not Found!
              </Typography>
            </Stack>
          )}

          <Stack flexDirection={"row"} justifyContent={"center"} mb={3}>
            {products.length != 0 && (
              <PaginationService
                count={count}
                itemsPerPage={40}
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
