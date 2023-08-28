import { getCateOfProduct } from "@/api/products";
import { useCateStore } from "@/zustand/cate";
import { useProductsStore } from "@/zustand/product";
import {
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Typography,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Props = {
  setCount: Dispatch<SetStateAction<number>>;
  getProductsApi: (page: number, number: number) => void;
  type: any;
  setType: any;
};

export default function SideBar({
  setCount,
  getProductsApi,
  setType,
  type,
}: Props) {
  const { cates } = useCateStore();
  const { setProducts, products } = useProductsStore();
  const initialProducts: any[] = products;

  const [value, setValue] = useState<number>(0);

  const handleChangeRangePrice = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const getProductCateApi = async () => {
    if (!type) return;
    const res = await getCateOfProduct(type);
    setProducts(res.products);
    setCount(res.total);
  };

  const getProductsByPrice = () => {
    const filterPrice: any = products.filter((item: any) => {
      const findPrice = item.price;
      if (value >= findPrice) {
        return item;
      }
      return false;
    });
    setProducts(filterPrice);
    setCount(products.length);
  };

  useEffect(() => {
    getProductCateApi();
  }, [type]);

  useEffect(() => {
    getProductsByPrice();
  }, [value]);

  return (
    <Box p={2}>
      <Typography variant="h5">Category</Typography>
      <FormControl sx={{ color: "#FA8232" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="female"
          name="radio-buttons-group"
          sx={{
            color: "#FA8232",
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setType(e.target.value)
          }
        >
          {cates.length == 0 ? (
            <h5>Loding...</h5>
          ) : (
            cates.map((item) => (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio color="warning" />}
                label={item}
              />
            ))
          )}
        </RadioGroup>
      </FormControl>

      <Divider sx={{ mt: 1, mb: 1 }} />
      <Typography variant="h5">Price range</Typography>

      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChangeRangePrice}
        valueLabelDisplay="auto"
        sx={{ color: "#FA8232" }}
        min={0}
        max={2500}
      />
    </Box>
  );
}
