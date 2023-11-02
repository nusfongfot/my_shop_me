import {
  deleteAddressAPIById,
  getAllAddressByIdAPI,
  updatedSelectedAddressAPI,
} from "@/api/address";
import { errorToast, successToast } from "@/utils/notification";
import Swal from "sweetalert2";

import useAuth from "@/zustand/auth";
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import BackDropLoading from "@/components/backDrop";
import { useAddUserSelected } from "@/zustand/address";
import DialogEditAddress from "./dialodEditAdd";

type Props = {};
export default function AddressDashBoard({}: Props) {
  const { auth } = useAuth();
  const { addUser, setAddUser } = useAddUserSelected();

  const [allAdd, setAllAdd] = useState<any[]>([]);
  const [editAdd, setEditAdd] = useState<any[]>([]);
  const [isLoding, setIsLoading] = useState(false);
  const [isDis, setIsDis] = useState(true);
  const [isEditOrCreate, setIsEditOrCreate] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const clickCreateAdd = () => {
    setOpenAdd(true);
    setIsEditOrCreate(false); // false = create
  };
  const handleClickOpenEditAdd = (id: number) => {
    const filter = allAdd.filter((item) => item.add_id == id);
    setEditAdd(filter);
    setOpenAdd(true);
    setIsEditOrCreate(true); // true = edit
  };

  const handleCloseEditAdd = () => {
    setOpenAdd(false);
  };

  const handleSwitchChange = async (id: number) => {
    let findIsTrue = allAdd.some((item) => item.isFirst === "true");
    if (findIsTrue) {
      let newData = [...allAdd];
      newData.map((item) => {
        if (item.isFirst === "true") {
          item.isFirst = "false";
        }
      });
      setAllAdd(newData);
    }

    const body = {
      add_id: id,
    };
    try {
      setIsLoading(true);
      const res = await updatedSelectedAddressAPI(auth.cus_id, body);
      if (res.res_code === "0000") {
        successToast(res?.message, 2000);
        let newData: any = [...allAdd];
        const index = newData.findIndex((item: any) => item.add_id == id);
        newData[index].isFirst = "true";
        setAllAdd(newData);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetAllAddressById = async () => {
    try {
      setIsLoading(true);
      const res = await getAllAddressByIdAPI(auth.cus_id);
      if (res.res_code === "0000") {
        setAllAdd(res.results);
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (item: any) => {
    const add_id = item.add_id;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      setIsLoading(true);
      if (result.isConfirmed) {
        try {
          const res = await deleteAddressAPIById(auth.cus_id, add_id);
          const filterDelete = allAdd.filter(
            (val) => val.add_id !== item.add_id
          );
          if (res.res_code === "0000") {
            successToast(res?.message, 2000);
            setAllAdd(filterDelete);
          }
        } catch (error: any) {
          console.log(error);
          errorToast(error.response.data.message, 2500);
        } finally {
          setIsLoading(false);
        }
      }
    });
  };

  useEffect(() => {
    if (auth.cus_id !== 0) {
      handleGetAllAddressById();
    }
  }, [auth.cus_id]);

  useEffect(() => {
    if (allAdd.length <= 1) {
      setIsDis(true);
    }
    if (allAdd.length > 1) {
      setIsDis(false);
    }
  }, [allAdd]);

  return (
    <Box>
      {isLoding && <BackDropLoading loading={isLoding} />}
      <Button variant="contained" onClick={clickCreateAdd}>
        Add address
      </Button>

      {allAdd.length == 0 ? (
        <Box sx={{ mt: 5, mb: 35.6 }}>
          <Typography variant="h4">No Data.</Typography>
        </Box>
      ) : (
        allAdd.map((item, i) => (
          <Paper
            sx={{
              p: 2,
              mb: allAdd.length === 1 ? 16.1 : 3,
              mt: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            key={i}
          >
            <Typography>Address</Typography>
            <Divider sx={{ mt: 1, mb: 1 }} />

            <Typography>
              {auth?.surname && auth?.surname !== ""
                ? `${auth?.name} ${auth?.surname}`
                : "Edit account for add fullname"}
            </Typography>

            <Stack flexDirection={"row"}>
              <Typography sx={{ color: "grey" }}>
                {`House no ${item.home_no} ${item.road} ${item.tambon} ${item.amphoe} ${item.province} ${item.zipcode}`}
              </Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Typography>Detail:</Typography>
              <Typography sx={{ color: "grey" }}>{item.detail}</Typography>
            </Stack>
            <Stack flexDirection={"row"}>
              <Typography>Phone:</Typography>
              <Typography sx={{ color: "grey" }}>{auth?.phone}</Typography>
            </Stack>
            <Stack flexDirection={"row"} gap={3}>
              <Button
                variant="contained"
                color="error"
                sx={{ mt: 1 }}
                onClick={() => handleDelete(item)}
                disabled={isDis}
              >
                delete address
              </Button>
              <Button
                variant="contained"
                color="info"
                sx={{ mt: 1 }}
                onClick={() => handleClickOpenEditAdd(item.add_id)}
              >
                edit address
              </Button>
              <FormControlLabel
                value="end"
                control={
                  <Switch
                    color="primary"
                    checked={item.isFirst === "true"}
                    onChange={() => handleSwitchChange(item.add_id)}
                  />
                }
                label="Set as default address"
                labelPlacement="end"
              />
            </Stack>
          </Paper>
        ))
      )}
      <DialogEditAddress
        openAdd={openAdd}
        handleCloseEditAdd={handleCloseEditAdd}
        setOpenAdd={setOpenAdd}
        editAdd={editAdd}
        isEditOrCreate={isEditOrCreate}
        setAllAdd={setAllAdd}
        allAdd={allAdd}
      />
    </Box>
  );
}
