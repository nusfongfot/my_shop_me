import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  NoSsr,
  Stack,
  Typography,
} from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import InFormation from "./information";
import CheckOutDone from "./checkout_done";
import { useState } from "react";
import { useCartStore, useTotalStore } from "@/zustand/product";

export default function Checkout() {
  const [checkout, setCheckout] = useState(false);
  const { cartItems, setCartItems } = useCartStore();
  const { total } = useTotalStore();

  const gotoCheckout = () => {
    window.localStorage.removeItem("cart-store");
    setCartItems([]);
    setCheckout(true);
  };

  return (
    <NoSsr>
      <Container maxWidth="xl">
        <Header1 />
        <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
          <ActiveLastBreadcrumb title="checkout" />
        </Box>

        {checkout ? (
          <CheckOutDone />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} lg={9}>
              <InFormation />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Typography variant="h5">Order Summary</Typography>
              <Box sx={{ border: "1px solid rgba(0,0,0,0.2)", p: 2 }}>
                {cartItems.map((item) => (
                  <Stack flexDirection={"row"} mt={1} gap={1} key={item.id}>
                    <img
                      style={{ width: 50, height: 50 }}
                      src={item.thumbnail}
                    />

                    <Box>
                      <Typography>{item.title}</Typography>
                      <Typography>
                        {item.qty} x ${item.price}
                      </Typography>
                    </Box>
                  </Stack>
                ))}

                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  mt={1}
                >
                  <Typography>Shipping</Typography>
                  <Typography>Free</Typography>
                </Stack>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Typography>Discount</Typography>
                  <Typography>$0</Typography>
                </Stack>

                <Divider sx={{ mt: 2, mb: 2 }} />

                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Typography>Total</Typography>
                  <Typography>${total}</Typography>
                </Stack>

                <Button
                  variant="contained"
                  className="btn_org"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={gotoCheckout}
                >
                  placeorder
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
      </Container>
    </NoSsr>
  );
}
