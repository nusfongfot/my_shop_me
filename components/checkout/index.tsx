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
import { useEffect, useState } from "react";
import { useCartStore, useTotalStore } from "@/zustand/product";
import useAuth from "@/zustand/auth";
import { useAddUserSelected } from "@/zustand/address";
import { getSelectedAddressAPI } from "@/api/address";
import BackDropLoading from "../backDrop";
import { createOrderAPI } from "@/api/order";
import { errorToast, successToast } from "@/utils/notification";

export default function Checkout() {
  const { auth } = useAuth();
  const { addUser, setAddUser } = useAddUserSelected();

  const [isLoding, setIsLoading] = useState(false);
  const [checkout, setCheckout] = useState(false);
  const { cartItems, setCartItems } = useCartStore();
  const { total } = useTotalStore();
  const [isDis, setIsDis] = useState(true);

  const gotoCheckout = async () => {
    const orderBody = cartItems.map((item) => {
      const cus_id = auth.cus_id;
      const pro_id = item.pro_id;
      const add_id = addUser[0].add_id;
      const items = item.qty;
      return { cus_id, pro_id, add_id, items };
    });
    const body = {
      orders: orderBody,
    };
    setIsLoading(true);
    try {
      const res = await createOrderAPI(body);
      console.log("res", res);
      if (res.res_code === "0000") {
        successToast(res?.message, 2000);
        window.localStorage.removeItem("cart-store");
        setCartItems([]);
        setCheckout(true);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const getSelectedUser = async () => {
    setIsLoading(true);
    try {
      const res = await getSelectedAddressAPI(auth.cus_id);
      if (res.res_code === "0000") {
        setAddUser(res.results);
      }
    } catch (error: any) {
      // errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (auth.cus_id) {
      getSelectedUser();
    }
    if (addUser.length !== 0) {
      setIsDis(false);
    } else {
      setIsDis(true);
    }
  }, [auth.cus_id, addUser[0]?.add_id]);

  return (
    <NoSsr>
      {isLoding && <BackDropLoading loading={isLoding} />}
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
                  <Stack flexDirection={"row"} mt={1} gap={1} key={item.pro_id}>
                    <img
                      style={{ width: 50, height: 50 }}
                      src={item.image.split(",")[0]}
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
                  disabled={isDis}
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
