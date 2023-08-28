import TrackOrder from "@/components/trackOrder";
import TrackOrderDetails from "@/components/trackorderDetail";
import { NoSsr } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  const renderItem = () => {
    if (router.asPath === "/track") {
      return <TrackOrder />;
    }
    if (router.query.subpath === "detail") {
      return <TrackOrderDetails />;
    }
  };

  useEffect(() => {
    renderItem();
  }, []);
  return <NoSsr>{renderItem()}</NoSsr>;
}
