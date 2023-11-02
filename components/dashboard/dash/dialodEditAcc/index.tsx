import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, TextField } from "@mui/material";
import useAuth from "@/zustand/auth";
import { errorToast, successToast } from "@/utils/notification";
import { editProfileAPI } from "@/api/profile";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  openAcc: boolean;
  handleCloseEditAcc: () => void;
  setOpenAcc: React.Dispatch<React.SetStateAction<boolean>>;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogEditAccount({
  openAcc,
  handleCloseEditAcc,
  setOpenAcc,
}: Props) {
  const { auth, setAuth } = useAuth();
  const [loading, setLoading] = React.useState(false);

  const [values, setValues] = React.useState({
    name: "",
    surname: "",
    username: "",
    phone: "",
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
  const handleEdit = async () => {
    setLoading(true);
    try {
      const res = await editProfileAPI(auth.cus_id, values);
      console.log("res", res);
      if (res.res_code === "0000") {
        setOpenAcc(false);
        successToast(res?.message, 2000);
        setAuth({
          cus_id: auth.cus_id,
          email: auth.email,
          photo_user: auth.photo_user,
          name: res.results[0].name,
          surname: res.results[0].surname,
          username: res.results[0].username,
          phone: res.results[0].phone,
          password: res.results[0].password,
        });
        setValues({
          name: "",
          surname: "",
          username: "",
          phone: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setValues({
      name: auth?.name,
      surname: auth?.surname,
      username: auth?.username,
      phone: auth?.phone,
      password: "",
      confirmPassword: "",
    });
  }, [auth.cus_id]);

  return (
    <Box sx={{ width: 500 }}>
      <BootstrapDialog
        onClose={handleCloseEditAcc}
        aria-labelledby="customized-dialog-title"
        open={openAcc}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Edit Account Info
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEditAcc}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: { sm: 500, xs: 300 } }}>
          <Typography>name</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="name"
            value={values.name}
            onChange={handleChangeValues}
          />
          <Typography>surname</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="surname"
            value={values.surname}
            onChange={handleChangeValues}
          />
          <Typography>username</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="username"
            value={values.username}
            onChange={handleChangeValues}
          />
          <Typography>phone</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="phone"
            inputProps={{ maxLength: 10 }}
            onKeyPress={(event) => {
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            value={values.phone}
            onChange={handleChangeValues}
          />
          <Typography>password</Typography>
          <TextField
            size="small"
            type="password"
            fullWidth
            name="password"
            value={values.password}
            onChange={handleChangeValues}
          />
          <Typography>confirmPassword</Typography>
          <TextField
            size="small"
            type="password"
            fullWidth
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChangeValues}
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={handleEdit}
            loading={loading}
            loadingIndicator="Loading…"
            variant="contained"
          >
            Save changes
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
