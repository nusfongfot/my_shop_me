import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageContent from "./swiper";
import { Product } from "@/type/product";
import LabTabs from "./tabs";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import { useCartStore, useTotalStore } from "@/zustand/product";
import { errorToast, successToast } from "@/utils/notification";
import { useRouter } from "next/router";
import useAuth from "@/zustand/auth";

type Props = {
  product: Product | undefined;
  setProduct: Dispatch<SetStateAction<Product | undefined>>;
};

export default function ProductDetails({ product, setProduct }: Props) {
  const router = useRouter();
  const { auth } = useAuth();
  const [value, setValue] = useState<number | null>(2);
  const { addToCartStore, cartItems } = useCartStore();
  const [qty, setQty] = useState<number>(1);

  const { total } = useTotalStore();

  const handleAddToCart = () => {
    const isExist = cartItems.some(
      (item: any) => item.pro_id == product?.pro_id
    );

    if (isExist) return errorToast("This product is in you cart!", 1500);
    addToCartStore(product);
    successToast("Add product successfully", 1500);
  };

  const handleBuynow = () => {
    addToCartStore(product);
    router.push("/checkout");
  };

  const updateQty = (row: any, type: string) => {
    if (type == "plus") {
      setQty((prev) => prev + 1);
      return (row.qty = qty + 1);
    } else {
      setQty((prev) => prev - 1);
      return (row.qty = qty - 1);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ p: 2 }}>
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={product?.category} />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <ImageContent product={product} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Stack flexDirection={"row"} gap={1}>
            <Rating value={4} sx={{ fontSize: 20, mb: 1 }} readOnly />
            <Typography>{product?.rating} Start Rating </Typography>
            <Typography sx={{ color: "grey" }}>
              (21,671 User feedback)
            </Typography>
          </Stack>
          <Typography variant="h5">{product?.title}</Typography>
          <Box mt={2} />

          <Stack
            flexDirection={"row"}
            gap={1}
            sx={{
              width: { xs: "100%", sm: "100%", lg: "50%" },
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          >
            <Stack flexDirection={"row"}>
              <Typography sx={{ color: "grey" }}>Sku:</Typography>
              <Typography>A264671</Typography>
            </Stack>

            <Stack flexDirection={"row"}>
              <Typography sx={{ color: "grey" }}>Availability:</Typography>
              <Typography sx={{ color: "green" }}>In Stock</Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Typography sx={{ color: "grey" }}>Brand:</Typography>
              <Typography>{product?.brand}</Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Typography sx={{ color: "grey" }}>Brand:</Typography>
              <Typography>{product?.category}</Typography>
            </Stack>
          </Stack>
          <Box mt={2} />

          <Typography variant="h5" sx={{ color: "#2DA5F3" }}>
            ${product?.price}
          </Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />

          <Stack flexDirection={"row"} justifyContent={"center"} gap={5}>
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              sx={{ border: "1px solid #E4E7E9" }}
            >
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={() => updateQty(product, "minus")}
                disabled={qty == 1}
              >
                -
              </Button>
              <Typography>{qty}</Typography>
              <Button
                variant="text"
                sx={{ color: "black" }}
                onClick={() => updateQty(product, "plus")}
              >
                +
              </Button>
            </Stack>
            {auth.cus_id ? (
              <>
                <Button
                  className="btn_org"
                  variant="contained"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outlined"
                  color="warning"
                  onClick={handleBuynow}
                >
                  buy now
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                sx={{ width: 250 }}
                className="btn_org"
              >
                login to buy
              </Button>
            )}
          </Stack>
          <Box sx={{ border: "1px solid rgba(0,0,0,0.1)", p: 1, mt: 2 }}>
            <Typography>100% Guarantee Safe Checkout</Typography>
            <img
              src="../img/getback.png"
              style={{ width: "100%", height: 30 }}
            />
          </Box>
        </Grid>
      </Grid>
      <LabTabs product={product} />
    </Container>
  );
}
