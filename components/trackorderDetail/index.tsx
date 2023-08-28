import { Box, Container, Stack, Typography } from "@mui/material";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import Header1 from "../header/header1";
import StepperTransSport from "./step";
import { data } from "./data";

export default function TrackOrderDetails() {
  return (
    <Container maxWidth="xl">
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"Track Order"} title1="Details" />
      </Box>

      <Box p={2} sx={{ border: "1px solid grey" }} mt={5} mb={5}>
        <Box sx={{ background: "#fefae4", border: "1px solid #FDFAE7" }} p={2}>
          <Stack
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Box>
              <Typography>#96459761</Typography>
              <Typography sx={{ color: "grey" }}>
                4 Products Order Placed in 17 Jan, 2021 at 7:32 PM
              </Typography>
            </Box>

            <Typography sx={{ color: "#2DA5F3" }} variant="h4">
              $1199.00
            </Typography>
          </Stack>
        </Box>

        <Typography variant="subtitle1" mt={2}>
          Order expected arrival 23 Jan, 2021
        </Typography>
        <Box mt={2}>
          <StepperTransSport />
        </Box>

        {data.map((item, i) => (
          <Stack flexDirection={"row"} key={i} gap={1}>
            {item.icon}
            <Box>
              <Typography>{item.title}</Typography>
              <Typography sx={{ color: "grey" }}>{item.sub}</Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
