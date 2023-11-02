import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import useAuth from "@/zustand/auth";
import { uploadSingleImage } from "@/api/uploadImg";
import { errorToast, successToast } from "@/utils/notification";
import BackDropLoading from "@/components/backDrop";
import { editProfileAPI } from "@/api/profile";

export default function SettingDashBoard() {
  const ref: any = useRef(null);
  const [file, setFile] = useState(null);
  const { auth, setAuth } = useAuth();

  const [isLoding, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickUpload = () => {
    ref.current.click();
  };

  const processFile = (e: any) => {
    const selectedFile = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setFile(selectedFile);
      if (selectedFile.size > 1000000) {
        alert("รูปภาพมีขนาดเกิน 1MB. กรุณาเลือกภาพใหม่!!!");
        setFile(null);
      }
    } else {
      setFile(null);
    }
  };

  const handleUploadImage = async () => {
    setIsLoading(true);
    const formData: any = new FormData();
    formData.append("file", file);
    try {
      const res = await editProfileAPI(auth.cus_id, formData);
      console.log("res", res);
      if (res.res_code === "0000") {
        successToast(res.message, 2000);
        setAuth(res.results[0]);
      }
    } catch (error: any) {
      errorToast(error, 2500);
    } finally {
      setIsLoading(false);
      setFile(null);
    }
  };

  return (
    <Paper sx={{ p: 2 }}>
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          {!file && (
            <Avatar
              sx={{ height: 150, width: 150 }}
              src={auth.photo_user || ""}
            />
          )}

          <TextField
            type="file"
            onChange={(e) => processFile(e)}
            inputProps={{
              accept: "image/jpeg, image/png",
              ref: ref,
            }}
            sx={{ display: "none" }}
          />

          {file ? (
            <Box>
              <Avatar
                sx={{ height: 150, width: 150 }}
                src={URL.createObjectURL(file)}
              />
              <Stack flexDirection={"row"} gap={2}>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  color="error"
                  onClick={() => setFile(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={handleUploadImage}
                >
                  Confirm
                </Button>
              </Stack>
            </Box>
          ) : (
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              onClick={handleClickUpload}
              size="small"
              sx={{ mt: 2, ml: 1 }}
            >
              Upload file
            </Button>
          )}
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
