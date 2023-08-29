import {
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, signOut } from "next-auth/react";

export default function LoginComponent() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box width={330} p={1}>
      <Typography align="center" variant="h6">
        Sign in to your account
      </Typography>
      <Typography mt={1}>Email</Typography>
      <TextField size="small" type="email" fullWidth />
      <Typography mt={1}>Password</Typography>
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
      <Button variant="contained" className="btn_org" fullWidth sx={{ mt: 2 }}>
        Login
      </Button>

      <Divider sx={{ mt: 3 }}>
        <Typography>Don't have account ?</Typography>
      </Divider>

      <Button
        startIcon={
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            style={{ width: 30, height: 30 }}
          />
        }
        variant="contained"
        className="btn_org"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => signIn("google", { redirect: false, callbackUrl: "/" })}
      >
        Signin with google
      </Button>

      <Button variant="outlined" sx={{ mt: 1 }} fullWidth color="warning">
        Create account
      </Button>
    </Box>
  );
}
