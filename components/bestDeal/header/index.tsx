import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useEffect, useState } from "react";
import { getCountdown } from "../countdown";
import { useRouter } from "next/router";

export default function HeaderDeals() {
  const router = useRouter();
  const [countDown, setCountDown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const intervalTask = setInterval(() => {
      const [days, hours, minutes, seconds] = getCountdown();
      setCountDown({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    }, 1000);
    return () => clearInterval(intervalTask);
  }, []);
  return (
    <>
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        mt={3}
        justifyContent={"space-between"}
      ></Stack>

      <Grid container>
        <Grid item xs={12} sm={3} lg={3}>
          <Typography variant="h4">Best Deals</Typography>
        </Grid>
        <Grid item xs={12} sm={7} lg={6}>
          <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                alignItems: { sm: "center" },
              }}
              alignItems={"center"}
              gap={2}
              flexDirection={"row"}
            >
              <Typography>Deals ends in</Typography>
              <Box sx={{ background: "#F3DE6D", p: 0.5, width: 250 }}>
                <Stack flexDirection={"row"} justifyContent={"center"}>
                  <Typography variant="h6">{`
                ${countDown.days}d : ${countDown.hours}h : ${countDown.minutes}m ${countDown.seconds}s
              `}</Typography>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={4} lg={3}>
          <Stack
            flexDirection={"row"}
            sx={{ justifyContent: { sm: "flex-start", lg: "flex-end" } }}
          >
            <Button
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={() => router.push("/shop")}
            >
              Browse All Products
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
