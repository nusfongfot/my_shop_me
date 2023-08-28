import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import { data, data1 } from "./data";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import ChatIcon from "@mui/icons-material/Chat";

export default function CustomerSupport() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Header1 />
        <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
          <ActiveLastBreadcrumb title={"Customer Support"} />
        </Box>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography
              sx={{ background: "#EFD33D", width: "fit-content", p: 1, mb: 2 }}
            >
              HELP CENTER
            </Typography>
            <Typography variant="h5">How we can help you!</Typography>

            <OutlinedInput
              id="outlined-adornment-password"
              type={"search"}
              endAdornment={
                <InputAdornment position="end">
                  <Button variant="contained" className="btn_org">
                    search
                  </Button>
                </InputAdornment>
              }
              sx={{
                width: { xs: "100%", md: "50%", lg: "50%" },
                background: "white",
                mt: 2,
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: { xs: "none", lg: "block" } }}>
              <img
                src="https://www.kindpng.com/picc/m/73-733483_call-centre-png-free-download-call-center-girl.png"
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 2, mb: 2 }} />

        <Typography align="center" variant="h4">
          What can we assist you with today?
        </Typography>
        <Stack
          flexDirection={"row"}
          gap={2}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          mt={2}
        >
          {data.map((item, i) => (
            <Stack
              flexDirection={"row"}
              key={i}
              alignItems={"center"}
              gap={1}
              sx={{
                borderWidth: 1,
                borderStyle: "solid",
                borderImage: "linear-gradient( #FA8232, #FFE7D6,#FA8232) 1",
                width: 300,
                p: 1,
                height: 70,
              }}
            >
              <Box>{item.icon}</Box>
              <Typography variant="h6">{item.title}</Typography>
            </Stack>
          ))}
        </Stack>
        <Divider sx={{ mt: 2, mb: 2 }} />

        <Typography align="center" variant="h4">
          Popular Topics
        </Typography>
        <Stack
          flexDirection={"row"}
          flexWrap={"wrap"}
          mt={2}
          justifyContent={"space-between"}
        >
          {data1.map((item, i) => (
            <Stack
              sx={{ width: { xs: "100%", lg: "33%" }, ml: { xs: 2, sm: 0 } }}
              key={i}
            >
              <ul>
                <li style={{ fontSize: 20 }}>{item.title}</li>
              </ul>
            </Stack>
          ))}
        </Stack>
      </Container>

      <Box sx={{ background: "#F2F4F5", mt: 5 }}>
        <Container maxWidth="xl" sx={{ p: 5 }}>
          <Stack
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button variant="contained" sx={{ mb: 3 }}>
              contact us
            </Button>
            <Typography variant="h4">Don't find your answer</Typography>
            <Typography variant="h4">Contact with us.</Typography>

            <Grid container spacing={3} mt={2}>
              <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                justifyContent={"flex-end"}
              >
                <Paper sx={{ p: 2 }}>
                  <Stack flexDirection={"row"} gap={2}>
                    <LocalPhoneIcon
                      sx={{
                        background: "#cde2f0",
                        fontSize: 60,
                        color: "#2DA5F3",
                      }}
                    />
                    <Box>
                      <Typography>Call us now</Typography>
                      <Typography>
                        we are available online from 9:00 AM to 5:00 PM
                        <br /> (GMT95:45) Talk with use now
                      </Typography>
                      <Typography>+1-202-555-0126</Typography>
                      <Button variant="contained">call now</Button>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                lg={6}
                display={"flex"}
                justifyContent={"flex-start"}
              >
                <Paper sx={{ p: 2 }}>
                  <Stack flexDirection={"row"} gap={2}>
                    <ChatIcon
                      sx={{
                        background: "#badfb7",
                        fontSize: 60,
                        color: "#2DB224",
                      }}
                    />
                    <Box>
                      <Typography>Chat with us</Typography>
                      <Typography>
                        we are available online from 9:00 AM to 5:00 PM
                        <br /> (GMT95:45) Talk with use now
                      </Typography>
                      <Typography>Support@clicon.com</Typography>
                      <Button variant="contained" color="success">
                        Contact us
                      </Button>
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
