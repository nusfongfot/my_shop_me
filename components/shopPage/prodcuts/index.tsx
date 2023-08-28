import Products from "@/components/bestDeal/products";
import { useProductsStore } from "@/zustand/product";
import { Stack, TextField, Typography } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { searchProducts } from "@/api/products";
import ProductService from "@/components/service-ui/products";
import { useRouter } from "next/router";

type Props = {
  getProductsApi: (page: number, number: number) => void;
  setCount: Dispatch<SetStateAction<number>>;
};

export default function ProductsShop({ getProductsApi, setCount }: Props) {
  const router = useRouter();
  const { products, setProducts } = useProductsStore();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const getProductCateApi = async () => {
    if (!search) {
      getProductsApi(1, 6);
    } else {
      const res = await searchProducts(search);
      setProducts(res.products);
      setCount(res.total);
    }

    if (products.length == 0 && search) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  };

  useEffect(() => {
    getProductCateApi();
  }, [search]);

  return (
    <div>
      <TextField
        size="small"
        fullWidth
        placeholder="search..."
        type="search"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />
      <ProductService onClick1={() => {}} data={products} />
      {isShow && (
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Typography variant="h4" sx={{ mt: 10, mb: 10 }} align="center">
            Product Not Found!
          </Typography>
        </Stack>
      )}
    </div>
  );
}
