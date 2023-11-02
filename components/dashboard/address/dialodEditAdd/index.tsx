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
import { Box, MenuItem, TextField } from "@mui/material";
import useAuth from "@/zustand/auth";
import { errorToast, successToast } from "@/utils/notification";
import { editProfileAPI } from "@/api/profile";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  createAddressAPI,
  editAddressByIDAPI,
  getAmphoeAPI,
  getProvinceAPI,
  getTambonAPI,
  getZipCodeAPI,
} from "@/api/address";
import { useAddUserSelected } from "@/zustand/address";

type Props = {
  openAdd: boolean;
  isEditOrCreate: boolean;
  handleCloseEditAdd: () => void;
  setOpenAdd: React.Dispatch<React.SetStateAction<boolean>>;
  editAdd: any[];
  setAllAdd: React.Dispatch<React.SetStateAction<any[]>>;
  allAdd: any[];
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function DialogEditAddress({
  openAdd,
  handleCloseEditAdd,
  setOpenAdd,
  editAdd,
  isEditOrCreate,
  setAllAdd,
  allAdd,
}: Props) {
  const { auth, setAuth } = useAuth();

  const [loading, setLoading] = React.useState(false);
  const [isDis, setIsDis] = React.useState(true);
  const [provinces, setProvinces] = React.useState([]);
  const [amphoes, setAmphoes] = React.useState([]);
  const [tambons, setTambons] = React.useState([]);
  const [values, setValues] = React.useState({
    add_id: isEditOrCreate ? 0 : null,
    cus_id: isEditOrCreate ? null : auth.cus_id,
    amphoe: "",
    tambon: "",
    road: "",
    province: "",
    zipcode: "",
    home_no: "",
    detail: "",
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
      const res = await editAddressByIDAPI(auth.cus_id, values);
      if (res.res_code === "0000") {
        setOpenAdd(false);
        successToast(res?.message, 2000);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    try {
      const res = await createAddressAPI(values);
      console.log("res", res);
      if (res.res_code === "0000") {
        setOpenAdd(false);
        successToast(res?.message, 2000);
        setAllAdd([values, ...allAdd]);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setLoading(false);
    }
  };

  const handeleFetchProvince = async () => {
    setLoading(true);
    try {
      const res = await getProvinceAPI();
      setProvinces(res.results);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handeleFetchAmphoe = async () => {
    setLoading(true);
    try {
      const res = await getAmphoeAPI(values.province);
      setAmphoes(res.results);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handeleFetchTambon = async () => {
    setLoading(true);
    try {
      const res = await getTambonAPI(values.province, values.amphoe);
      setTambons(res.results);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handeleFetchZipcode = async () => {
    setLoading(true);
    try {
      const res = await getZipCodeAPI(
        values.province,
        values.amphoe,
        values.tambon
      );
      setValues((prevValues) => ({
        ...prevValues,
        zipcode: res.zipcode,
      }));
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    if (!!editAdd[0] && isEditOrCreate) {
      setValues((prevState) => ({
        ...prevState,
        add_id: editAdd[0]?.add_id,
        road: editAdd[0]?.road,
        home_no: editAdd[0]?.home_no,
        detail: editAdd[0]?.detail,
        province: editAdd[0]?.province,
        amphoe: editAdd[0]?.amphoe,
        tambon: editAdd[0]?.tambon,
        zipcode: editAdd[0]?.zipcode,
      }));
    }
    if (!isEditOrCreate) {
      setValues({
        add_id: isEditOrCreate ? 0 : null,
        cus_id: isEditOrCreate ? null : auth.cus_id,
        amphoe: "",
        tambon: "",
        road: "",
        province: "",
        zipcode: "",
        home_no: "",
        detail: "",
      });
    }
  }, [editAdd, isEditOrCreate, auth.cus_id]);

  React.useEffect(() => {
    handeleFetchProvince();
    handeleFetchAmphoe();
    handeleFetchTambon();
    if (values.province && values.amphoe && values.tambon) {
      handeleFetchZipcode();
      setIsDis(false);
    }
  }, [values.province, values.amphoe, values.tambon]);

  return (
    <Box sx={{ width: 500 }}>
      <BootstrapDialog
        onClose={handleCloseEditAdd}
        aria-labelledby="customized-dialog-title"
        open={openAdd}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {isEditOrCreate ? "Edit Address Info" : "Create Address Info"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseEditAdd}
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
          <Typography>House no.</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="home_no"
            value={values.home_no}
            onChange={handleChangeValues}
          />
          <Typography>Road.</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="road"
            value={values.road}
            onChange={handleChangeValues}
          />
          <Typography>Detail. (Optional)</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="detail"
            value={values.detail}
            onChange={handleChangeValues}
          />
          <Typography>Province.</Typography>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            fullWidth
            name="province"
            value={values.province}
            onChange={handleChangeValues}
          >
            {provinces?.map((val: any, i) => (
              <MenuItem key={i} value={val.province}>
                {val.province}
              </MenuItem>
            ))}
          </TextField>
          <Typography>Amphoe.</Typography>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            fullWidth
            name="amphoe"
            value={values.amphoe}
            onChange={handleChangeValues}
          >
            {amphoes?.map((val: any, i) => (
              <MenuItem key={i} value={val.amphoe}>
                {val.amphoe}
              </MenuItem>
            ))}
          </TextField>
          <Typography>Tambon.</Typography>
          <TextField
            id="outlined-select-currency"
            select
            size="small"
            fullWidth
            name="tambon"
            value={values.tambon}
            onChange={handleChangeValues}
          >
            {tambons?.map((val: any, i) => (
              <MenuItem key={i} value={val.tambon}>
                {val.tambon}
              </MenuItem>
            ))}
          </TextField>
          <Typography>Zipcode.</Typography>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="zipcode"
            onChange={handleChangeValues}
            value={values.zipcode}
            disabled
          />
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={isEditOrCreate ? handleEdit : handleCreate}
            loading={loading}
            loadingIndicator="Loading…"
            variant="contained"
            disabled={isDis}
          >
            Save changes
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}
