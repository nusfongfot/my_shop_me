import {
  Box,
  Button,
  Card,
  Grid,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useRouter } from "next/router";
import { useCartStore } from "@/zustand/product";
import { errorToast, successToast } from "@/utils/notification";
import { useEffect, useState } from "react";

type Props = {
  data: any[];
};

export default function ProductService({ data }: Props) {
  const router = useRouter();
  const { cartItems, addToCartStore } = useCartStore();

  const handleClickLearnMore = (item: any) => {
    router.push({
      pathname: `/product/${item}`,
    });
  };

  const handleAddToCart = (item: any) => {
    const isExist = cartItems.some((product: any) => product.id == item.id);

    if (isExist) return errorToast("This product is in you cart!", 1500);
    addToCartStore(item);
    successToast("Add product successfully", 1500);
  };

  return (
    <div>
      <Grid container spacing={3}>
        {data.map((item: any, i: any) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
            <Card sx={{ maxWidth: 345, mb: 3, mt: 3, height: 440 }}>
              <img
                src={item.thumbnail}
                style={{ width: "100%", height: "230px" }}
              />

              <Stack
                flexDirection={"column"}
                justifyContent={"space-between"}
                p={1}
                height={190}
              >
                <Box>
                  <Typography variant="h5">
                    {item.title.substring(0, 15) + "..."}
                  </Typography>
                  <Typography variant="body2" sx={{}}>
                    {item.description.substring(0, 65) + "..."}
                  </Typography>
                </Box>

                <Stack
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Typography variant="h6" sx={{ color: "#2DA5F3" }}>
                    {`${item.price}$`}
                  </Typography>

                  <Rating
                    value={item.rating}
                    sx={{ fontSize: 15, mb: 1 }}
                    readOnly
                  />
                  <Stack flexDirection={"row"}>
                    <Button
                      startIcon={<ShoppingCartRoundedIcon />}
                      size="small"
                      variant="contained"
                      className="btn_org"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add to cart
                    </Button>
                    <Button
                      size="small"
                      onClick={() => handleClickLearnMore(item.id)}
                    >
                      Learn More
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
