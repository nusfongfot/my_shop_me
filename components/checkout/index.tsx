import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import InFormation from "./information";
import CheckOutDone from "./checkout_done";
import { useState } from "react";

export default function Checkout() {
  const [checkout, setCheckout] = useState(false);

  const gotoCheckout = () => {
    setCheckout(true);
  };

  return (
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
              <Stack flexDirection={"row"}>
                <img
                  style={{ width: 50, height: 50 }}
                  src="https://media-cdn.bnn.in.th/16129/Sony-Headphone-with-Mic-Wireless-WH-1000XM4BME-Black-1.jpg"
                />

                <Box>
                  <Typography>Title of the product</Typography>
                  <Typography>1 x $400</Typography>
                </Box>
              </Stack>

              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Sub-total</Typography>
                <Typography>$1200</Typography>
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
                <Typography>$2400.99</Typography>
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
  );
}
