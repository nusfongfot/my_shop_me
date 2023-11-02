import {
  getCateOfProduct,
  getPriceRangeAPI,
  getProducts,
} from "@/api/products";
import BackDropLoading from "@/components/backDrop";
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
  useMemo,
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
  const [isLoding, setIsLoading] = useState(false);

  const [value, setValue] = useState<number[]>([0, 0]);

  const handleChangeRangePrice = (event: any, newValue: any) => {
    setValue(newValue);
  };

  const getProductCateApi = async () => {
    if (!type) return;
    try {
      setIsLoading(true);
      const res = await getCateOfProduct(type);
      if (res?.res_code === "0000") {
        setProducts(res.products);
        setCount(res.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductsByPrice = async () => {
    try {
      setIsLoading(true);
      const res = await getPriceRangeAPI(value[0], value[1]);
      if (res.res_code === "0000") {
        setProducts(res.products);
      } else {
        setProducts(res.products);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProductCateApi();
  }, [type]);

  useEffect(() => {
    if (value[1] !== 0) {
      getProductsByPrice();
    }
  }, [value]);
  return (
    <Box p={2}>
      {isLoding && <BackDropLoading loading={isLoding} />}
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
          {cates?.categories?.map((item: any) => (
            <FormControlLabel
              key={item}
              value={item}
              control={<Radio color="warning" />}
              label={item}
            />
          ))}
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
        max={3500}
      />
    </Box>
  );
}
