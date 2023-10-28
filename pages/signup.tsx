import Header1 from "@/components/header/header1";
import ActiveLastBreadcrumb from "@/components/service-ui/breadcrumbs";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { errorToast, successToast } from "@/utils/notification";
import { signUpAPI } from "@/api/authenticate";
import BackDropLoading from "@/components/backDrop";
import { useRouter } from "next/router";

type Props = {};
function SignUpPage({}: Props) {
  const [isLoding, setIsLoading] = useState(false);
  const router = useRouter();

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errMsg, setErrMsg] = useState(false);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!values.username) {
      setErrMsg(true);
      errors.username = "Username is required";
    }
    if (!values.email) {
      setErrMsg(true);
      errors.email = "Email is required";
    }
    if (!values.password) {
      setErrMsg(true);
      errors.password = "Password is required";
    }
    if (!values.confirmPassword) {
      setErrMsg(true);
      errors.confirmPassword = "ConfirmPassword is required";
      return;
    }
    console.log(values);
    try {
      setIsLoading(true);
      const res = await signUpAPI(values);
      console.log("res", res);
      if (res?.res_code === "0000") {
        successToast("Register Successfully", 2000);
        router.replace("/");
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="xl">
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"Signup"} />
      </Box>
      <Typography textAlign={"center"} variant="h4">
        SignUp
      </Typography>
      <Container maxWidth="sm">
        <Paper sx={{ p: 3, mb: 3 }} component={"form"}>
          <Typography mt={1}>Username</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="username"
            value={values.username}
            onChange={handleChangeValues}
            error={errMsg}
            helperText={errors.username}
          />
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
          <TextField
            size="small"
            type="password"
            fullWidth
            required
            name="password"
            value={values.password}
            onChange={handleChangeValues}
            error={errMsg}
            helperText={errors.password}
          />
          <Typography mt={1}>Confirmpassword</Typography>
          <TextField
            size="small"
            type="password"
            fullWidth
            required
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChangeValues}
            error={errMsg}
            helperText={errors.confirmPassword}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, width: 150 }}
            onClick={(e: FormEvent) => handleSignUp(e)}
          >
            Submit
          </Button>
        </Paper>
      </Container>
    </Container>
  );
}
export default SignUpPage;
