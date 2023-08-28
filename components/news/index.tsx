import { getPost } from "@/api/post";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Person2RoundedIcon from "@mui/icons-material/Person2Rounded";
import TextsmsRoundedIcon from "@mui/icons-material/TextsmsRounded";
import DateRangeRoundedIcon from "@mui/icons-material/DateRangeRounded";

export default function News() {
  const [posts, setPosts] = useState<any[]>([]);

  const getPostApi = async () => {
    const res = await getPost(3);
    setPosts(res.posts);
  };

  useEffect(() => {
    getPostApi();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" align="center">
        Latest News
      </Typography>
      <Grid container>
        {posts.map((item, i) => (
          <Grid item xs={12} md={2} lg={4} key={i}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                title="green iguana"
              />

              <Stack flexDirection={"row"} justifyContent={"center"} gap={3}>
                <Stack flexDirection={"row"}>
                  <Person2RoundedIcon sx={{ color: "#FA8232" }} />
                  <Typography>Anonymous</Typography>
                </Stack>
                <Stack flexDirection={"row"}>
                  <DateRangeRoundedIcon sx={{ color: "#FA8232" }} />
                  <Typography>19Dec,2013</Typography>
                </Stack>
                <Stack flexDirection={"row"}>
                  <TextsmsRoundedIcon sx={{ color: "#FA8232" }} />
                  <Typography>453</Typography>
                </Stack>
              </Stack>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title.substring(0, 25) + "..."}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.body.substring(0, 200) + "..."}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" className="btn_org" variant="contained">
                  Read More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
