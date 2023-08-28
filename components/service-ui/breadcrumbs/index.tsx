import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

type Props = {
  title: string | undefined;
  title1?: string;
};

export default function ActiveLastBreadcrumb({ title, title1 }: Props) {
  const router = useRouter();
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/shop">
          Shop
        </Link>
        {title && <Typography>{title}</Typography>}
        {title1 && <Typography>{title1}</Typography>}
      </Breadcrumbs>
    </div>
  );
}
