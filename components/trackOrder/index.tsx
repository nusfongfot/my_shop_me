import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import InfoIcon from "@mui/icons-material/Info";
import { useRouter } from "next/router";
import { useState } from "react";
import { errorToast, successToast } from "@/utils/notification";
import { getOrderIbByAPI } from "@/api/order";
import BackDropLoading from "../backDrop";

export default function TrackOrder() {
  const router = useRouter();
  const [values, setValues] = useState("");
  const [isLoding, setIsLoading] = useState(false);

  const handleCheckTrack = async () => {
    try {
      setIsLoading(true);
      const res = await getOrderIbByAPI(values);
      if (res.res_code === "0000") {
        successToast(res.message, 2000);
        router.push(`/track?subpath=detail&orderId=${values}`);
      } else {
        errorToast("Order not found", 2500);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container maxWidth="xl">
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"Track Order"} />
      </Box>

      <Box>
        <Typography variant="h4">Track Order</Typography>

        <Typography sx={{ color: "grey" }}>
          To track your order please enter your order ID in the input field
          below and press the “Track Order”
          <br /> button. this was given to you on your receipt and in the
          confirmation email you should have received.
        </Typography>
      </Box>

      <Grid container mt={2} mb={2}>
        <Grid item xs={12} lg={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography>Order ID</Typography>
              <TextField
                size="small"
                fullWidth
                value={values}
                onChange={(e) => setValues(e.target.value)}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Stack flexDirection={"row"} alignItems={"center"}>
        <InfoIcon sx={{ color: "grey" }} />
        <Typography sx={{ color: "grey" }}>
          Order ID that we sended to your in your email address.
        </Typography>
      </Stack>

      <Button
        className="btn_org"
        variant="contained"
        sx={{ mt: 2, mb: 2 }}
        onClick={() => handleCheckTrack()}
      >
        track order
      </Button>
      <Box height={187} />
    </Container>
  );
}
