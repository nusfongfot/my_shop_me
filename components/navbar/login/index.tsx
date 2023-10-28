import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { signInAPI } from "@/api/authenticate";
import { errorToast, successToast } from "@/utils/notification";
import BackDropLoading from "@/components/backDrop";
import { getCookie, setCookie } from "cookies-next";
import useAuth from "@/zustand/auth";
import apiFetch from "@/helpers/interceptors";

type Props = {
  setOpenLogin: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
};

export default function LoginComponent({ setOpenLogin }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const { auth, setAuth, setAccInfo } = useAuth();
  const router = useRouter();
  const [errMsg, setErrMsg] = useState(false);
  const [isLoding, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (!values.email) {
      setErrMsg(true);
      errors.email = "Email is required";
    }
    if (!values.password) {
      setErrMsg(true);
      errors.password = "Password is required";
      return;
    }

    try {
      setIsLoading(true);
      const res = await signInAPI(values);
      console.log("SIGN RES", res);

      if (res?.res_code === "0000") {
        router.replace("/dashboard?subpath=dashboard");
        setCookie("token", res.token);
        setAuth(res.user);
        setCookie("accInfo", res.user);
        successToast(res?.message, 2000);
        setOpenLogin(null);
      } 
    } catch (error: any) {
      console.log("err", error);
      errorToast(error.response.data.message, 2000);
    } finally {
      setIsLoading(false);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <Box width={330} p={1}>
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Typography align="center" variant="h6">
        Sign in to your account
      </Typography>
      <Typography mt={1}>Email</Typography>
      <TextField
        size="small"
        type="email"
        fullWidth
        name="email"
        value={values.email}
        onChange={handleChangeValues}
        error={errMsg}
        helperText={errors.email}
      />
      <Typography mt={1}>Password</Typography>
      <OutlinedInput
        name="password"
        value={values.password}
        onChange={handleChangeValues}
        error={errMsg}
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
      {errMsg && (
        <FormHelperText sx={{ color: "red", ml: 2 }}>
          {errors.password}
        </FormHelperText>
      )}
      <Button
        variant="contained"
        className="btn_org"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSignIn}
      >
        Login
      </Button>

      <Divider sx={{ mt: 3 }}>
        <Typography>Don't have account ?</Typography>
      </Divider>

      {/* <Button
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
        onClick={() =>
          signIn("google", {
            redirect: true,
            callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
          })
        }
      >
        Signin with google
      </Button> */}

      <Button
        variant="outlined"
        sx={{ mt: 1 }}
        fullWidth
        color="warning"
        onClick={() => {
          router.push("/signup");
          setOpenLogin(null);
        }}
      >
        Create account
      </Button>
    </Box>
  );
}
