import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Stack, Typography } from "@mui/material";
import { useCartStore, useTotalStore } from "@/zustand/product";

export default function DataGridDemo() {
  const { cartItems, setCartItems } = useCartStore();
  const [rows, setRows] = React.useState<any[]>(cartItems);
  const { setTotal } = useTotalStore();

  const updateQty = (row: any, type: string) => {
    const rowItem = row.row;
    setRows((prevCarts) => {
      return prevCarts.map((product) => {
        if (product.id === rowItem.id) {
          return {
            ...product,
            qty: type == "plus" ? product.qty + 1 : product.qty - 1,
          };
        }
        return product;
      });
    });
  };

  const handleDeleteItem = (row: any) => {
    const filter = rows.filter((value) => value.id !== row.id);
    setRows(filter);
  };

  const columns: GridColDef[] = [
    {
      field: "images",
      headerName: "Products",
      // flex: 1,
      width: 250,
      editable: false,
      renderCell: (params) => (
        <>
          <img style={{ width: 50, height: 50 }} src={params.value[0]} />
        </>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      // flex: 1,
      width: 250,
      editable: false,
    },

    {
      field: "qty",
      headerName: "Quantity",
      description: "This column has a value getter and is not sortable.",
      // flex: 1,
      width: 250,
      renderCell: (params) => (
        <Stack flexDirection={"row"} gap={1} alignItems={"center"}>
          <Button
            variant="outlined"
            disabled={params.value == 1}
            onClick={() => updateQty(params, "minus")}
          >
            -
          </Button>
          <Typography>{params.value}</Typography>
          <Button variant="outlined" onClick={() => updateQty(params, "plus")}>
            +
          </Button>
        </Stack>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      // flex: 1,
      width: 250,
      editable: false,
      renderCell: (params) => (
        <Typography>
          {(params.row.price * params.row.qty).toFixed(2)}
        </Typography>
      ),
    },
    {
      field: "id",
      headerName: "Action",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <Button
            variant="text"
            color="error"
            onClick={() => handleDeleteItem(params.row)}
          >
            X
          </Button>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    const valueTotal = rows
      .reduce((acc, value) => acc + value.price * value.qty, 0)
      .toFixed(2);
    setTotal(valueTotal);
    setCartItems(rows);
  }, [rows]);

  return (
    <Box sx={{ height: 369, width: "100%", mb: 5 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooterPagination
      />
    </Box>
  );
}
