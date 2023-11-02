import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Product } from "@/type/product";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { feature, shipping } from "./mock";
import useAuth from "@/zustand/auth";
import { useRouter } from "next/router";
import {
  createCommentsProductAPI,
  getCommentsProductByIdAPI,
} from "@/api/comment";
import { errorToast, successToast } from "@/utils/notification";
import LoadingButton from "@mui/lab/LoadingButton";

type Props = {
  product: Product | undefined;
};

interface Comments {
  comment_id?: number;
  created_at?: string;
  username: string;
  details: string;
  star: number;
  cus_id: number;
  pro_id: any;
}
export default function LabTabs({ product }: Props) {
  const { auth } = useAuth();
  const router = useRouter();
  const pro_id = router?.query?.id;

  const [value, setValue] = React.useState("1");
  const [star, setStar] = React.useState(1);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState<Comments[]>([]);
  const [loading, setLoading] = React.useState(false);

  const [isDis, setIsDis] = React.useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: number
  ) => {
    setStar(newValue);
  };

  const handleComment = async () => {
    const body = {
      cus_id: auth.cus_id,
      star: star,
      details: comment.trim(),
      pro_id: router?.query?.id,
    };

    try {
      setLoading(true);
      const res = await createCommentsProductAPI(body);
      if (res.res_code === "0000") {
        successToast(res.message, 2000);
        setComments([
          {
            cus_id: auth.cus_id,
            star: star,
            details: comment.trim(),
            pro_id: router?.query?.id,
            username: auth.username,
          },
          ...comments,
        ]);
        setComment("");
      }
    } catch (error: any) {
      errorToast(error.response.data.message, 2500);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (comment == "") {
      setIsDis(true);
    } else {
      setIsDis(false);
    }
  }, [comment]);

  React.useEffect(() => {
    (async () => {
      if (router.isReady) {
        const allComments = await getCommentsProductByIdAPI(pro_id as string);
        setComments(allComments.results);
      }
    })();
  }, [auth.cus_id]);
  return (
    <Box sx={{ mt: 3 }}>
      <TabContext value={value}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Description" value="1" />
            <Tab label="Review" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography fontWeight={900}>Description</Typography>
                <Typography sx={{ color: "grey" }}>
                  {product?.description}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography fontWeight={900}>Feature</Typography>
                {feature.map((item, i) => (
                  <Stack
                    flexDirection={"row"}
                    key={i}
                    gap={1}
                    alignItems={"center"}
                  >
                    <img src={item.img} style={{ width: 30, height: 30 }} />
                    <Typography sx={{ color: "grey" }}>{item.title}</Typography>
                  </Stack>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box>
                <Typography fontWeight={900}>Shipping Information</Typography>
                {shipping.map((item, i) => (
                  <Stack
                    flexDirection={"row"}
                    key={i}
                    gap={1}
                    alignItems={"center"}
                  >
                    <Typography>{item.title}</Typography>
                    <Typography sx={{ color: "grey" }}>{item.sub}</Typography>
                  </Stack>
                ))}
              </Box>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value="2">
          {auth.cus_id ? (
            <Box sx={{ mb: 5 }}>
              <Stack>
                <Rating
                  name="half-rating"
                  precision={0.5}
                  value={star}
                  onChange={(e: any, n: any) => handleRatingChange(e, n)}
                />
                <TextField
                  variant="standard"
                  size="small"
                  sx={{ width: 500 }}
                  multiline
                  maxRows={8}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Stack>

              <LoadingButton
                loading={loading}
                loadingIndicator="Loading…"
                variant="contained"
                sx={{ mt: 2 }}
                onClick={handleComment}
                disabled={isDis}
              >
                review
              </LoadingButton>
            </Box>
          ) : (
            <Button variant="contained" sx={{ mb: 5 }}>
              login to review a product
            </Button>
          )}

          {comments.length === 0 ? (
            <Typography variant="h5">No review yet.</Typography>
          ) : (
            comments.map((item: any, i) => (
              <Box sx={{ mb: 1 }} key={i}>
                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <Avatar />
                  <Box>
                    <Typography>@{item.username}</Typography>
                    <Rating
                      name="half-rating"
                      defaultValue={item.star}
                      readOnly
                      size="small"
                    />
                    <Typography>{item.details}</Typography>
                  </Box>
                </Stack>
              </Box>
            ))
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
