import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem, Stack } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

type Props = {
  color: string;
};

export default function CardPayment({ color }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Card sx={{ maxWidth: 320, background: color, color: "white" }}>
        <CardHeader
          action={
            <IconButton
              aria-label="settings"
              onClick={(e: any) => handleClick(e)}
            >
              <MoreVertIcon sx={{ color: "white" }} />
            </IconButton>
          }
          subheader="$95, 400.00 USD"
          sx={{ color: "white" }}
        />
        <CardContent>
          <Typography>Card Number</Typography>
          <Stack flexDirection={"row"} alignItems={"center"}>
            <Typography>**** **** **** 3814</Typography>
            <ContentPasteIcon sx={{ fontSize: 18 }} />
          </Stack>

          <Stack flexDirection={"row"} justifyContent={"space-between"}>
            <Typography>VISA</Typography>
            <Typography>Kevin Gilbert</Typography>
          </Stack>
        </CardContent>
      </Card>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Edit Card</MenuItem>
        <MenuItem onClick={handleClose}>Delete Card</MenuItem>
      </Menu>
    </>
  );
}
