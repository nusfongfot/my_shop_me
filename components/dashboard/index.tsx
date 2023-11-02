import {
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import Header1 from "../header/header1";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import { cloneElement, useState } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddCardIcon from "@mui/icons-material/AddCard";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import Dash from "./dash";
import { useRouter } from "next/router";
import SettingDashBoard from "./setting";
import { signOut } from "next-auth/react";
import AddressDashBoard from "./address";
import HomeIcon from "@mui/icons-material/Home";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import OrderDashBoard from "./orders";
export default function DashBoard() {
  const router = useRouter();

  const list = [
    {
      link: "/dashboard?subpath=dashboard",
      sub: "dashboard",
      title: "Dashboard",
      icon: <DashboardIcon />,
    },
    {
      link: "/dashboard?subpath=address",
      sub: "address",
      title: "Address",
      icon: <HomeIcon />,
    },
    {
      link: "/dashboard?subpath=orders",
      sub: "orders",
      title: "Order",
      icon: <ProductionQuantityLimitsIcon />,
    },
    {
      link: "/dashboard?subpath=setting",
      sub: "setting",
      title: "Setting",
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Container maxWidth="xl">
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"Dashboard"} />
      </Box>

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} lg={2}>
          <Paper>
            <List>
              {list.map((item, i) => (
                <Link href={item.link} key={i}>
                  <ListItem
                    sx={{
                      background:
                        router.query.subpath === item.sub ? "#FA8232" : "",
                    }}
                  >
                    <ListItemAvatar>
                      <Box
                        sx={{
                          color:
                            router.query.subpath === item.sub
                              ? "white"
                              : "black",
                        }}
                      >
                        {item.icon}
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.title}
                      sx={{
                        color:
                          router.query.subpath === item.sub ? "white" : "black",
                      }}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={10}>
          {router.query.subpath == "dashboard" && <Dash />}
          {router.query.subpath == "setting" && <SettingDashBoard />}
          {router.query.subpath == "address" && <AddressDashBoard />}
          {router.query.subpath == "orders" && <OrderDashBoard />}
        </Grid>
      </Grid>
    </Container>
  );
}
