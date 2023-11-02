import { Box, Container, Stack, Typography } from "@mui/material";
import ActiveLastBreadcrumb from "../service-ui/breadcrumbs";
import Header1 from "../header/header1";
import StepperTransSport from "./step";
import { data } from "./data";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getOrderIbByAPI } from "@/api/order";
import { errorToast, successToast } from "@/utils/notification";
import BackDropLoading from "../backDrop";
import dayjs from "dayjs";

export default function TrackOrderDetails() {
  const router = useRouter();
  const idOrder: any = router?.query?.orderId;
  const [isLoding, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const res = await getOrderIbByAPI(idOrder);
        if (res.res_code === "0000") {
          successToast(res?.message, 2000);
          setOrder(res.results);
          setTotal(res.total_price);
        }
      } catch (error: any) {
        window.location.replace("/");
        errorToast(error.message, 2500);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [idOrder]);

  return (
    <Container maxWidth="xl">
      {isLoding && <BackDropLoading loading={isLoding} />}

      <Header1 />
      <Box sx={{ background: "#F2F4F5", p: 2, mb: 2 }}>
        <ActiveLastBreadcrumb title={"Track Order"} title1="Details" />
      </Box>

      <Box p={2} sx={{ border: "1px solid grey" }} mt={5} mb={5}>
        {order.map((item: any, i) => (
          <Box
            sx={{ background: "#fefae4", border: "1px solid #FDFAE7" }}
            p={2}
            key={i}
          >
            <Stack
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box>
                <Typography>#{item.order_id}</Typography>
                <Typography sx={{ color: "grey" }}>
                  {`${order.length} Products Order Placed in ${dayjs(
                    item.created_at
                  ).format("YYYY-MM-DD")} at ${dayjs(
                    item.created_at
                  ).format("mm:ss A")}`}
                </Typography>
              </Box>

              <Typography sx={{ color: "#2DA5F3" }} variant="h4">
                ${total}
              </Typography>
            </Stack>
          </Box>
        ))}

        <Typography variant="subtitle1" mt={2}>
          Order expected arrival 23 Jan, 2021
        </Typography>
        <Box mt={2}>
          <StepperTransSport order={order} />
        </Box>

        {data.map((item, i) => (
          <Stack flexDirection={"row"} key={i} gap={1} mt={3}>
            {item.icon}
            <Box>
              <Typography>{item.title}</Typography>
              <Typography sx={{ color: "grey" }}>{item.sub}</Typography>
            </Box>
          </Stack>
        ))}
      </Box>
    </Container>
  );
}
