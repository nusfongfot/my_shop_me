import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import CustomizedAccordions from "./faqs";

export default function Help() {
  return (
    <Container maxWidth="xl">
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"FAQs"} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8} mt={3} mb={3}>
          <Typography variant="h4">Frequently Asked Questions </Typography>
          <CustomizedAccordions />
        </Grid>
        <Grid item xs={12} lg={4} mt={3} mb={3}>
          <Box sx={{ background: "#FBF4CE", p: 2 }}>
            <Typography variant="h5">
              {"Don’t find your answer, Ask for support."}
            </Typography>
            <Typography sx={{ color: "grey" }}>
              Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed
              molestie accumsan dui, non iaculis primis in faucibu raesent eget
              sem purus.
            </Typography>

            <TextField
              size="small"
              sx={{ background: "white", color: "white", mt: 2 }}
              placeholder="Email"
              fullWidth
            />
            <TextField
              size="small"
              sx={{ background: "white", color: "white", mt: 2 }}
              placeholder="Subject"
              fullWidth
            />
            <TextField
              size="small"
              sx={{ background: "white", color: "white", mt: 2 }}
              placeholder="Message(Optional)"
              fullWidth
              multiline
              maxRows={3}
            />
            <Button variant="contained" className="btn_org" sx={{ mt:2}}>
              Send Message
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box height={129} />
    </Container>
  );
}
