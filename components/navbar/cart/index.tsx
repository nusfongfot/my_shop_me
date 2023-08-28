import { Box, Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useCartStore, useTotalStore } from "@/zustand/product";
type Props = {
  handleCloseUserMenu: Function;
};

export default function CartComponent({ handleCloseUserMenu }: Props) {
  const router = useRouter();
  const { cartItems, setCartItems } = useCartStore();
  const { total } = useTotalStore();

  const goToCart = () => {
    router.push("/cart");
    handleCloseUserMenu();
  };

  const goToCheckout = () => {
    router.push("/checkout");
    handleCloseUserMenu();
  };

  const handleDeleteItems = (item: any) => {
    const itemId = item.id;
    const filterItem = cartItems.filter((value) => value.id !== itemId);
    setCartItems(filterItem);
  };

  return (
    <Box width={330} p={1}>
      <Typography variant="h6">{`Shopping Cart (${cartItems.length})`}</Typography>
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

            <Typography>{`${item.qty} X ${item.price}`}</Typography>
          </Box>
          <CloseIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleDeleteItems(item)}
          />
        </Stack>
      ))}

      <Divider sx={{ mt: 1, mb: 1 }} />

      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        <Typography>Total:</Typography>
        <Typography>{total}</Typography>
      </Stack>

      <Button
        variant="contained"
        className="btn_org"
        fullWidth
        sx={{ mt: 2 }}
        onClick={goToCheckout}
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
