import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Button, Typography } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "thumbnail",
    headerName: "Products",
    // flex: 1,
    width: 250,
    editable: true,
    renderCell: () => (
      <>
        <img
          style={{ width: 50, height: 50 }}
          src="https://media-cdn.bnn.in.th/16129/Sony-Headphone-with-Mic-Wireless-WH-1000XM4BME-Black-1.jpg"
        />
      </>
    ),
  },
  {
    field: "price",
    headerName: "Price",
    // flex: 1,
    width: 250,
    editable: true,
  },

  {
    field: "quantity",
    headerName: "Quantity",
    description: "This column has a value getter and is not sortable.",
    // flex: 1,
    width: 250,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: "total",
    headerName: "Total",
    // flex: 1,
    width: 250,
    editable: true,
    renderCell: (params) => <Typography>{params.value}</Typography>,
  },
  {
    field: "id",
    headerName: "Action",
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <>
        <Button variant="text" color="error">
          X
        </Button>
      </>
    ),
  },
];

const rows: any = [
  { id: 1, thumbnail: "img", price: 200, quantity: 2, total: 400 },
  { id: 2, thumbnail: "img", price: 350, quantity: 2, total: 700 },
];

export default function DataGridDemo() {
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
