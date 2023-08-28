import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { data } from "../data";
import PhoneIcon from "@mui/icons-material/Phone";
import { useCateStore } from "@/zustand/cate";
import { useRouter } from "next/router";

export default function Header1() {
  const { cates } = useCateStore();
  const router = useRouter();
  console.log("rr", router.asPath);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box mt={2} mb={2}>
      <Grid container>
        <Grid
          item
          xs={12}
          sm={9}
          md={9}
          lg={10}
          display={"flex"}
          alignItems={"center"}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              mt: { xs: 1 },
              mb: { xs: 1 },
            }}
            justifyContent={"space-between"}
            gap={2}
          >
            {data.map((item, i) => (
              <Link key={i} href={item.link}>
                <Stack flexDirection={"row"} gap={1}>
                  <Box
                    sx={{ color: router.asPath == item.link ? "#FA8232" : "" }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{ color: router.asPath == item.link ? "#FA8232" : "" }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          sm={3}
          md={3}
          lg={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Stack flexDirection={"row"}>
            <PhoneIcon />
            <Typography>085-555-5555</Typography>
          </Stack>
        </Grid>
      </Grid>

      <Menu
        sx={{ mt: "50px", height: 500 }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {cates.map((setting, i) => (
          <MenuItem key={i} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
