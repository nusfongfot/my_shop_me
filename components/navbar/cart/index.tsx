import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useCartStore } from "@/zustand/product";
type Props = {
  handleCloseUserMenu: Function;
};

export default function CartComponent({ handleCloseUserMenu }: Props) {
  const router = useRouter();
  const { cartItems } = useCartStore();

  const goToCart = () => {
    router.push("/cart");
    handleCloseUserMenu();
  };
  console.log("cart", cartItems);
  return (
    <Box width={330} p={1}>
      <Typography variant="h6">Shopping Cart (02)</Typography>
      <Divider sx={{ mt: 1 }} />

      {cartItems.map((item) => (
        <Stack
          flexDirection={"row"}
          mt={2}
          gap={1}
          justifyContent={"space-between"}
          key={item.id}
        >
          <Box sx={{ border: "1px solid grey", height: 50 }}>
            <img src={item.thumbnail} style={{ width: 50, height: 40 }} />
          </Box>

          <Box>
            <Typography>
              {item.title.substring(0, 40) + "..."}
              <br /> {item.description.substring(0, 20) + "..."}
            </Typography>

            <Typography>{`1 X ${item.price}`}</Typography>
          </Box>
          <CloseIcon />
        </Stack>
      ))}

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Typography>Total:</Typography>
        <Typography>15,000</Typography>
      </Stack>

      <Button
        variant="contained"
        className="btn_org"
        fullWidth
        sx={{ mt: 2 }}
        onClick={goToCart}
      >
        Check out now
      </Button>

      <Button
        variant="outlined"
        sx={{ mt: 1 }}
        fullWidth
        color="warning"
        onClick={goToCart}
      >
        View Cart
      </Button>
    </Box>
  );
}
