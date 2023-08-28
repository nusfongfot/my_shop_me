import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
export default function InFormation() {
  const [selectedValue, setSelectedValue] = useState("a");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Billing Information
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} lg={4}>
          <Typography>FirstName</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>
          <Typography>LastName</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={4} lg={4}>
          <Typography>Company Name(Optional)</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Typography>Address</Typography>
          <TextField size="small" fullWidth />
        </Grid>

        <Grid item xs={12} sm={3} lg={3}>
          <Typography>Country</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <Typography>State</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <Typography>City</Typography>
          <TextField size="small" fullWidth />
        </Grid>
        <Grid item xs={12} sm={3} lg={3}>
          <Typography>ZipCode</Typography>
          <TextField size="small" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography>Email</Typography>
          <TextField size="small" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography>Phone Number</Typography>
          <TextField size="small" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ border: "1px solid rgba(0,0,0,0.2)", p: 2, mt: 2 }}>
        <Typography>Payment Options</Typography>
        <Divider sx={{ mt: 1, mb: 1 }} />

        <Stack
          flexDirection={"row"}
          sx={{ width: "100%" }}
          justifyContent={"space-between"}
        >
          <Stack flexDirection={"column"} alignItems={"center"}>
            <img src="../img/curren.png" style={{ width: 30, height: 30 }} />
            <Typography>Cash on Delivery</Typography>
            <Stack flexDirection={"row"}>
              <Radio
                checked={selectedValue === "a"}
                onChange={handleChange}
                value="a"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Stack>
          </Stack>

          <Stack flexDirection={"column"} alignItems={"center"}>
            <img src="../img/Vector.png" style={{ width: 30, height: 30 }} />
            <Typography>Vector</Typography>
            <Stack flexDirection={"row"}>
              <Radio
                checked={selectedValue === "b"}
                onChange={handleChange}
                value="b"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Stack>
          </Stack>

          <Stack flexDirection={"column"} alignItems={"center"}>
            <img src="../img/paypal.png" style={{ width: 30, height: 30 }} />
            <Typography>Paypal</Typography>
            <Stack flexDirection={"row"}>
              <Radio
                checked={selectedValue === "c"}
                onChange={handleChange}
                value="c"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Stack>
          </Stack>

          <Stack flexDirection={"column"} alignItems={"center"}>
            <img src="../img/amazon.png" style={{ width: 30, height: 30 }} />
            <Typography>Amazon Pay</Typography>
            <Stack flexDirection={"row"}>
              <Radio
                checked={selectedValue === "d"}
                onChange={handleChange}
                value="d"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Stack>
          </Stack>

          <Stack flexDirection={"column"} alignItems={"center"}>
            <img
              src="../img/CreditCard.png"
              style={{ width: 30, height: 30 }}
            />
            <Typography>Debit/Credit Card</Typography>
            <Stack flexDirection={"row"}>
              <Radio
                checked={selectedValue === "e"}
                onChange={handleChange}
                value="e"
                name="radio-buttons"
                inputProps={{ "aria-label": "A" }}
              />
            </Stack>
          </Stack>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Name on Card</Typography>
            <TextField size="small" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Typography>Card Number</Typography>
            <TextField size="small" fullWidth />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>Expire Date</Typography>
            <TextField size="small" fullWidth type="date" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography>CVC</Typography>
            <TextField size="small" fullWidth />
          </Grid>
        </Grid>
      </Box>

      <Box mb={3}>
        <Typography mt={3}>Additional Information</Typography>
        <Typography>
          Order Notes <span style={{ color: "grey" }}>(Optional)</span>
        </Typography>
        <TextField size="small" fullWidth maxRows={3} multiline />
      </Box>
    </Box>
  );
}
