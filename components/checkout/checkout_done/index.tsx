import { Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";
export default function CheckOutDone() {
  const router = useRouter();

  return (
    <Box>
      <Stack flexDirection={"column"} alignItems={"center"} mt={5}>
        <CheckCircleIcon sx={{ color: "green", fontSize: 60 }} />
        <Typography variant="h4">Your order is successfully place</Typography>
        <Typography sx={{ color: "grey" }} mt={5}>
          Pellentesque sed lectus nec tortor tristique accumsan quis
          <br /> dictum risus. Donec volutpat mollis nulla non facilisis.
        </Typography>
        <Stack flexDirection={"row"} gap={3} mt={5}>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => router.push("/dashboard?subpath=dashboard")}
          >
            Go to Dashboard
          </Button>
          <Button
            variant="contained"
            className="btn_org"
            onClick={() => router.push("/dashboard?subpath=dashboard")}
          >
            View Order
          </Button>
        </Stack>
      </Stack>
      <Box height={175} />
    </Box>
  );
}
