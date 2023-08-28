import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Badge, Divider, Link, NoSsr, Stack, TextField } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import LoginComponent from "./login";
import CartComponent from "./cart";
import { useRouter } from "next/router";
import { useCartStore } from "@/zustand/product";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function ResponsiveAppBar() {
  const router = useRouter();
  const { cartItems } = useCartStore();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [openLogin, setOpenLogin] = React.useState<null | HTMLElement>(null);
  const [search, setSearch] = React.useState<string>("");

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenLogin = (event: React.MouseEvent<HTMLElement>) => {
    setOpenLogin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseLogin = () => {
    setOpenLogin(null);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (search) {
      router.push({
        pathname: "/shop",
        query: search,
      });
    }
  };
  console.log("cartItems", typeof Number(cartItems.length));
  return (
    <NoSsr>
      <AppBar position="static" sx={{ background: "#1B6392" }}>
        <Container maxWidth="xl">
          <Stack
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
            }}
            justifyContent={"space-between"}
          >
            <Typography>
              Welcome to Scorpion online eCommerce store.{" "}
            </Typography>
            <Stack flexDirection={"row"}>
              <Typography>Follow us.</Typography>
              <FacebookIcon />
              <InstagramIcon />
            </Stack>
          </Stack>
          <Divider sx={{ background: "white", mt: 1 }} />
          <Toolbar disableGutters>
            <Link href="/" sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}>
              <img
                src="../img/logo.png"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
            </Link>

            <Link href="/">
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                  flexGrow: 1,
                }}
              >
                Scorpion Shop
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
              <img
                src="../img/logo.png"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  marginRight: 10,
                }}
              />
            </Box>

            <Box
              component={"form"}
              onSubmit={(e: any) => handleSubmitSearch(e)}
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            >
              <TextField
                size="small"
                sx={{ background: "white" }}
                placeholder="search..."
                fullWidth
                type="search"
                value={search}
                onChange={(e: any) => setSearch(e.target.value)}
              />
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              <IconButton onClick={handleOpenLogin} sx={{ p: 0 }}>
                <PersonIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>

        <Menu
          sx={{ mt: "45px" }}
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
          <CartComponent handleCloseUserMenu={handleCloseUserMenu} />
        </Menu>

        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={openLogin}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(openLogin)}
          onClose={handleCloseLogin}
        >
          <LoginComponent />
        </Menu>
      </AppBar>
    </NoSsr>
  );
}
export default ResponsiveAppBar;
