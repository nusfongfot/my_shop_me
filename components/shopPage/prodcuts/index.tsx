import Products from "@/components/bestDeal/products";
import { useProductsStore } from "@/zustand/product";
import { Button, Stack, TextField, Typography } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { searchProducts } from "@/api/products";
import ProductService from "@/components/service-ui/products";
import { useRouter } from "next/router";
import { errorToast } from "@/utils/notification";
import BackDropLoading from "@/components/backDrop";

type Props = {
  getProductsApi: (page: number, number: number) => void;
  setCount: Dispatch<SetStateAction<number>>;
};

export default function ProductsShop({ getProductsApi, setCount }: Props) {
  const router = useRouter();
  const { products, setProducts } = useProductsStore();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isLoding, setIsLoading] = useState(false);
  const [search, setSearch] = useState<string>("");

  const getProductSearchByApi = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await searchProducts(search);
      setProducts(res.products);
      setCount(res.total);

      if (products.length == 0 && search) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Stack
        flexDirection={"row"}
        component={"form"}
        onSubmit={getProductSearchByApi}
      >
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
        <Button
          size="small"
          variant="contained"
          sx={{ width: 150 }}
          onClick={getProductSearchByApi}
          type="submit"
          className="btn_org"
        >
          Search
        </Button>
      </Stack>
      <ProductService data={products} />
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
