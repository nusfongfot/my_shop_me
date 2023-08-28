import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Product } from "@/type/product";
import { Avatar, Divider, Grid, Stack, Typography } from "@mui/material";
import { comments, feature, shipping } from "./mock";

type Props = {
  product: Product | undefined;
};

export default function LabTabs({ product }: Props) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TabContext value={value}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Description" value="1" />
            <Tab label="Review" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography fontWeight={900}>Description</Typography>
                <Typography sx={{ color: "grey" }}>
                  {product?.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography fontWeight={900}>Feature</Typography>
                {feature.map((item,i) => (
                  <Stack flexDirection={"row"} key={i} gap={1} alignItems={"center"}>
                    <img src={item.img} style={{ width: 30, height: 30 }} />
                    <Typography sx={{ color: "grey" }}>{item.title}</Typography>
                  </Stack>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography fontWeight={900}>Shipping Information</Typography>
                {shipping.map((item, i) => (
                  <Stack
                    flexDirection={"row"}
                    key={i}
                    gap={1}
                    alignItems={"center"}
                  >
                    <Typography>{item.title}</Typography>
                    <Typography sx={{ color: "grey" }}>{item.sub}</Typography>
                  </Stack>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography fontWeight={900}>Description</Typography>
              <Typography sx={{ color: "grey" }}>
                {product?.description}
              </Typography>
            </Box>

            <Box>
              <Typography fontWeight={900}>Feature</Typography>
              {feature.map((item) => (
                <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                  <img src={item.img} style={{ width: 30, height: 30 }} />
                  <Typography sx={{ color: "grey" }}>{item.title}</Typography>
                </Stack>
              ))}
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box>
              <Typography fontWeight={900}>Shipping Information</Typography>
              {shipping.map((item) => (
                <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
                  <Typography>{item.title}</Typography>
                  <Typography sx={{ color: "grey" }}>{item.sub}</Typography>
                </Stack>
              ))}
            </Box>
          </Stack> */}
        </TabPanel>
        <TabPanel value="2">
          {comments.map((item: any, i) => (
            <Box sx={{ mb: 1 }} key={i}>
              <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                <Avatar />
                <Box>
                  <Typography>@{item.user.username}</Typography>
                  <Typography>{item.body}</Typography>
                </Box>
              </Stack>
            </Box>
          ))}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
