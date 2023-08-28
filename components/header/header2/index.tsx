import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { data1 } from "../data";

export default function Header2() {
  return (
    <div>
      <img src="../img/product.png" style={{ width: "100%", height: "100%" }} />

      <Grid container spacing={2}>
        {data1.map((item, i) => (
          <Grid item xs={12} md={6} lg={4} xl={3} key={i}>
            <Stack
              sx={{
                border: "1px solid #E4E7E9",
                p: 2,
                mt: 2,
                borderRadius: "0.5rem",
              }}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
                <Box>{item.icon}</Box>
                <Box>
                  <Typography variant="h5">{item.title}</Typography>
                  <Typography sx={{ color: "#5F6C72" }}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
