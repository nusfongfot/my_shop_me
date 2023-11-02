import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { popular } from "./data";

export default function Footer() {
  return (
    <Box sx={{ background: "#191C1F", color: "white" }}>
      <Container maxWidth="xl" sx={{ p: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={3}>
            <Stack flexDirection={"column"}>
              <Stack flexDirection={"row"} alignItems={"center"} gap={1}>
                <img
                  src="../img/logo.png"
                  style={{ width: 40, height: 40, borderRadius: "50%" }}
                />
                <Typography variant="h6">Scorpion Shop</Typography>
              </Stack>
              <Typography sx={{ color: "#77878F" }}>
                Customer Supports:
              </Typography>
              <Typography>(629) 555-0129</Typography>

              <Typography sx={{ color: "#77878F" }}>
                4517 Washington Ave. Manchester,
                <br /> Kentucky 39495
              </Typography>
              <Typography>info@kinbo.com</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Typography fontWeight={900}>Top Category</Typography>
            <Typography sx={{ color: "#77878F" }}>Computer & Laptop</Typography>
            <Typography sx={{ color: "#77878F" }}>SmartPhone</Typography>
            <Typography sx={{ color: "#77878F" }}>Headphone</Typography>
            <Typography sx={{ color: "#77878F" }}>Accessories</Typography>
            <Typography sx={{ color: "#77878F" }}>Camera & Photo</Typography>
            <Typography sx={{ color: "#77878F" }}>TV & Homes</Typography>
            <Stack flexDirection={"row"} gap={2}>
              <Typography sx={{ color: "#EBC80C" }}>
                {" "}
                Browse All Product
              </Typography>
              <ArrowForwardIcon sx={{ color: "#EBC80C" }} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Typography fontWeight={900}>Quick links</Typography>
            <Typography sx={{ color: "#77878F" }}>Shop Product</Typography>
            <Typography sx={{ color: "#77878F" }}>Shoping Cart</Typography>
            <Typography sx={{ color: "#77878F" }}>Wishlist</Typography>
            <Typography sx={{ color: "#77878F" }}>Compare</Typography>
            <Typography sx={{ color: "#77878F" }}>Track Order</Typography>
            <Typography sx={{ color: "#77878F" }}>Customer Help</Typography>
            <Typography sx={{ color: "#77878F" }}>About Us</Typography>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Typography fontWeight={900}>Download APP</Typography>

            <Paper sx={{ background: "#303639", p: 1 }}>
              <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                <img
                  src="../img/playstore.png"
                  style={{ width: 30, height: 30 }}
                />
                <Box sx={{ color: "white" }}>
                  <Typography>Get it now</Typography>
                  <Typography fontWeight={900}>Google Play</Typography>
                </Box>
              </Stack>
            </Paper>

            <Paper sx={{ background: "#303639", p: 1, mt: 2 }}>
              <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                <img src="../img/apple.png" style={{ width: 30, height: 30 }} />
                <Box sx={{ color: "white" }}>
                  <Typography>Get it now</Typography>
                  <Typography fontWeight={900}>App Store</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={12} lg={3}>
            <Typography fontWeight={900}>Popular Tag</Typography>

            <Stack flexDirection={"row"} flexWrap={"wrap"} gap={2}>
              {popular.map((item, i) => (
                <Box
                  key={i}
                  sx={{ border: "1px solid rgba(255,255,255,0.7)", p: 0.5 }}
                >
                  {item}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ mt: 1, background: "white", mb: 1 }} />
      <Typography align="center" sx={{ fontSize: 12, color: "#ADB7BC" }}>
        Kinbo - eCommerce Template © 2021. Design by Templatecookie
      </Typography>
    </Box>
  );
}
