import {
  Avatar,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function SettingDashBoard() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Avatar sx={{ height: 150, width: 150 }} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>Display name</Typography>
              <TextField size="small" fullWidth />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography>Username</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Full name</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Email</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Phone number</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Country/Region</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>States</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Zip code</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>
            <Button
              className="btn_org"
              variant="contained"
              sx={{ mt: 2, ml: 3 }}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Billing Address</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>First name</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Last name</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Address</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Country</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Region/State</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>City</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Zip code</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Email</Typography>
              <TextField size="small" fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Typography>Phone</Typography>
            <TextField size="small" fullWidth />
          </Grid>

          <Button className="btn_org" variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">Shipping Address</Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography>First name</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Last name</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Address</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Country</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Region/State</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>City</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={""}
                onChange={() => {}}
                fullWidth
                size="small"
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Zip code</Typography>
              <TextField size="small" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography>Email</Typography>
              <TextField size="small" fullWidth />
            </Grid>
          </Grid>
          <Grid item xs={12} mt={1}>
            <Typography>Phone</Typography>
            <TextField size="small" fullWidth />
          </Grid>

          <Button className="btn_org" variant="contained" sx={{ mt: 2 }}>
            Save Changes
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h5" mt={5}>
        Change Password
      </Typography>

      <Typography mt={2}>Current Password</Typography>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        size="small"
        fullWidth
      />

      <Typography mt={2}>New Password</Typography>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        size="small"
        fullWidth
      />

      <Typography mt={2}>Confirm Password</Typography>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        size="small"
        fullWidth
      />
      <Button className="btn_org" variant="contained" sx={{ mt: 2 }}>
        Change Password
      </Button>
    </Paper>
  );
}
