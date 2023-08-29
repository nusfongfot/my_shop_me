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
import { useSession } from "next-auth/react";

export default function Dash() {
  const { data: session } = useSession();

  return (
    <Box mb={3}>
      <Typography variant="h6">Hello {session?.user?.name}.</Typography>
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
              <Avatar />
              <Box>
                <Typography>Sorawit Khongsrima</Typography>
                <Typography sx={{ color: "grey" }}>
                  Dhaka - 1207, Bangladesh
                </Typography>
              </Box>
            </Stack>
            <Stack flexDirection={"row"} mt={1}>
              <Typography>Email:</Typography>
              <Typography sx={{ color: "grey" }}>
                kevin.gilbert@gmail.com
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} mt={1}>
              <Typography>Sec Email:</Typography>
              <Typography sx={{ color: "grey" }}>
                kevin12345@gmail.com
              </Typography>
            </Stack>
            <Stack flexDirection={"row"} mt={1}>
              <Typography>Phone:</Typography>
              <Typography sx={{ color: "grey" }}>+1-202-555-0118</Typography>
            </Stack>
            <Button variant="outlined" color="info" sx={{ mt: 1 }}>
              edit account
            </Button>
          </Paper>
        </Grid>
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
            <Typography>Billing Address</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />

            <Typography>Sorawit Khongsrima</Typography>

            <Stack flexDirection={"row"}>
              <Typography sx={{ color: "grey" }}>
                East Tejturi Bazar, Word No. 04, Road No. 13/x, House no.
                1320/C, Flat No. 5D, Dhaka - 1200, Bangladesh
              </Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Typography>Sec Email:</Typography>
              <Typography sx={{ color: "grey" }}>
                kevin12345@gmail.com
              </Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Typography>Phone:</Typography>
              <Typography sx={{ color: "grey" }}>+1-202-555-0118</Typography>
            </Stack>
            <Button variant="outlined" color="info" sx={{ mt: 1 }}>
              edit address
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={2}>
          <Paper sx={{ background: "#EAF6FE" }}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={1}>
              <RocketIcon
                sx={{ fontSize: 45, background: "white", color: "#2DA5F3" }}
              />
              <Box>
                <Typography>154</Typography>
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
                <Typography>05</Typography>
                <Typography>Pending Orders</Typography>
              </Box>
            </Stack>
          </Paper>

          <Paper sx={{ background: "#EAF7E9", mt: 3 }}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={1} p={1}>
              <MarkunreadMailboxIcon
                sx={{ fontSize: 45, background: "white", color: "#2DB224" }}
              />
              <Box>
                <Typography>154</Typography>
                <Typography>Total Orders</Typography>
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
    </Box>
  );
}
