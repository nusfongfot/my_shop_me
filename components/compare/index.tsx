import { Box, Container } from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";

export default function Compare() {
  return (
    <Container maxWidth="xl">
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"compare"} />
      </Box>
    </Container>
  );
}
