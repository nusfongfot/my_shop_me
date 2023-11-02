import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import DataGridDemo from "./table";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import Header1 from "../header/header1";
import { useRouter } from "next/router";
import { useCartStore, useTotalStore } from "@/zustand/product";
import { useEffect, useState } from "react";

export default function Cart() {
  const router = useRouter();
  const { total, setTotal } = useTotalStore();
  const { cartItems } = useCartStore();
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    if (cartItems.length > 0) {
      setIsCheckout(false);
    } else {
      setIsCheckout(true);
    }
  }, [cartItems]);

  return (
    <Container maxWidth="xl">
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title="cart" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={9} mt={3}>
          <Typography variant="h5">Shopping Cart</Typography>
          <DataGridDemo />
        </Grid>
        <Grid item xs={12} md={3} mt={3}>
          <Typography variant="h5">Card Totals</Typography>
          <Box sx={{ border: "1px solid rgba(0,0,0,0.2)", p: 2 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Typography>Sub-total</Typography>
              <Typography>${total}</Typography>
            </Stack>

            <Stack flexDirection={"row"} justifyContent={"space-between"}>
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
              onClick={() => router.push("/checkout")}
              disabled={isCheckout}
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
