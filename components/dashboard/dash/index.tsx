import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import RocketIcon from "@mui/icons-material/Rocket";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import CardPayment from "./cardPayment";
import useAuth from "@/zustand/auth";
import DialogEditAccount from "./dialodEditAcc";
import { useEffect, useState } from "react";
import { errorToast } from "@/utils/notification";
import { getSelectedAddressAPI } from "@/api/address";
import DialogEditAddress from "./dialodEditAdd";
import BackDropLoading from "@/components/backDrop";
import { useAddUserSelected } from "@/zustand/address";
import { historyOrderAPI } from "@/api/order";

export default function Dash() {
  const { auth } = useAuth();
  const { addUser, setAddUser } = useAddUserSelected();

  const [isLoding, setIsLoading] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [orders, setOrders] = useState([]);
  const findPending = orders?.filter(
    (item: any) => item.status_order !== "Cancel order"
  );
  const findCancel = orders?.filter(
    (item: any) => item.status_order == "Cancel order"
  );

  const handleClickOpenEditAcc = () => {
    setOpenAcc(true);
  };

  const handleCloseEditAcc = () => {
    setOpenAcc(false);
  };

  const handleClickOpenEditAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEditAdd = () => {
    setOpenAdd(false);
  };

  const getSelectedUser = async () => {
    setIsLoading(true);
    try {
      const res = await getSelectedAddressAPI(auth.cus_id);
      if (res.res_code === "0000") {
        setAddUser(res.results);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetOrders = async () => {
    try {
      setIsLoading(true);
      const res = await historyOrderAPI(auth.cus_id);

      if (res.res_code === "0000") {
        setOrders(res.results);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (auth.cus_id !== 0) {
      getSelectedUser();
      handleGetOrders();
    }
  }, [auth.cus_id]);

  return (
    <Box mb={3}>
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Typography variant="h6">
      Hello{" "}
        {auth?.surname && auth?.surname !== ""
          ? `${auth?.name} ${auth?.surname}`
          : "Edit account for add fullname"}
      </Typography>
      <Typography>
        From your account dashboard. you can easily check & view your <br />
        <span style={{ color: "#2DA5F3" }}>Recent Orders,</span> manage your
        <span style={{ color: "#2DA5F3" }}>Shipping and Billing Addresses</span>
        and <br />
        edit your <span style={{ color: "#2DA5F3" }}>Password</span> and
        <span style={{ color: "#2DA5F3" }}> Account Details.</span>
      </Typography>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} md={5}>
          <Paper
            sx={{
              p: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Typography>Account Info</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />
            <Stack flexDirection={"row"} gap={1}>
              <Avatar src={auth.photo_user || ""} />
              <Box>
                <Typography>
                  {auth?.surname && auth?.surname !== ""
                    ? `${auth?.name} ${auth?.surname}`
                    : "Edit account for add fullname"}
                </Typography>
                <Typography sx={{ color: "grey" }}>
                  Dhaka - 1207, Bangladesh
                </Typography>
              </Box>
            </Stack>
            <Stack flexDirection={"row"} mt={1}>
              <Typography>Email:</Typography>
              <Typography sx={{ color: "grey" }}>{auth.email}</Typography>
            </Stack>
            <Stack flexDirection={"row"} mt={1}>
              <Typography>username:</Typography>
              <Typography sx={{ color: "grey" }}>{auth.username}</Typography>
            </Stack>
            <Stack flexDirection={"row"} mt={1}>
              <Typography>Phone:</Typography>
              <Typography sx={{ color: "grey" }}>{auth?.phone}</Typography>
            </Stack>
            <Button
              variant="outlined"
              color="info"
              sx={{ mt: 1 }}
              onClick={handleClickOpenEditAcc}
            >
              edit account
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          {addUser?.map((item: any, i) => (
            <Paper
              sx={{
                p: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              key={i}
            >
              <Typography>Billing Address</Typography>
              <Divider sx={{ mt: 1, mb: 1 }} />

              <Typography>
                {auth?.surname && auth?.surname !== ""
                  ? `${auth?.name} ${auth?.surname}`
                  : "Edit account for add fullname"}
              </Typography>

              <Stack flexDirection={"row"}>
                <Typography sx={{ color: "grey" }}>
                  {`House no ${item.home_no} ${item.road} ${item.tambon} ${item.amphoe} ${item.province} ${item.zipcode}`}
                </Typography>
              </Stack>
              <Stack flexDirection={"row"}>
                <Typography>Detail:</Typography>
                <Typography sx={{ color: "grey" }}>{item.detail}</Typography>
              </Stack>
              <Stack flexDirection={"row"}>
                <Typography>Phone:</Typography>
                <Typography sx={{ color: "grey" }}>{auth?.phone}</Typography>
              </Stack>
              <Button
                variant="outlined"
                color="info"
                sx={{ mt: 1 }}
                onClick={handleClickOpenEditAdd}
              >
                edit address
              </Button>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper sx={{ background: "#EAF6FE" }}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={1}>
              <RocketIcon
                sx={{ fontSize: 45, background: "white", color: "#2DA5F3" }}
              />
              <Box>
                <Typography>{0 || orders.length}</Typography>
                <Typography>Total Orders</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ background: "#FFF3EB", mt: 3 }}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={1}>
              <BookmarksIcon
                sx={{ fontSize: 45, background: "white", color: "#FA8232" }}
              />
              <Box>
                <Typography>{0 || findPending.length}</Typography>
                <Typography>Pending Orders</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ background: "#f7e9e9", mt: 3 }}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={1}>
              <MarkunreadMailboxIcon
                sx={{ fontSize: 45, background: "white", color: "#b22424" }}
              />
              <Box>
                <Typography>{0 || findCancel.length}</Typography>
                <Typography>Cancel Orders</Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Typography mt={3} variant="h5">
        Payment Options
      </Typography>
      <Grid container mt={4} spacing={2}>
        <Grid item xs={12} md={4}>
          <CardPayment color="#1B6392" />
        </Grid>
        <Grid item xs={12} md={4}>
          <CardPayment color="#2DB224" />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box />
        </Grid>
      </Grid>

      <DialogEditAccount
        openAcc={openAcc}
        handleCloseEditAcc={handleCloseEditAcc}
        setOpenAcc={setOpenAcc}
      />
      <DialogEditAddress
        openAdd={openAdd}
        handleCloseEditAdd={handleCloseEditAdd}
        setOpenAdd={setOpenAdd}
      />
    </Box>
  );
}
