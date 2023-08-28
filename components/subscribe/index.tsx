import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

export default function SubscribeNews() {
  return (
    <Box sx={{ background: "#1B6392", p: 2, color: "white", mt: 5 }}>
      <Container maxWidth="xl">
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Typography variant="h4">Subscribe to our newsletter</Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)" }}>
            Praesent fringilla erat a lacinia egestas. Donec vehicula tempor
            libero et
            <br /> cursus. Donec non quam urna. Quisque vitae porta ipsum.
          </Typography>

          <OutlinedInput
            id="outlined-adornment-password"
            type={"text"}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  className="btn_org"
                  endIcon={<ArrowForwardRoundedIcon />}
                >
                  subscribe
                </Button>
              </InputAdornment>
            }
            sx={{
              width: { xs: "100%", md: "50%", lg: "50%" },
              background: "white",
              mt: 2,
            }}
          />
          <img
            src="../img/partner.png"
            style={{ width: "100%", height: "100%" }}
          />
        </Stack>
      </Container>
    </Box>
  );
}
