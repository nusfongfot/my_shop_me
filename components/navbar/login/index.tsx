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

      <Button variant="contained" className="btn_org" fullWidth sx={{ mt: 2 }}>
        Signin with google
      </Button>

      <Button variant="outlined" sx={{ mt: 1 }} fullWidth color="warning">
        Create account
      </Button>
    </Box>
  );
}
