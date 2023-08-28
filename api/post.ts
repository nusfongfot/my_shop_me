import axios from "axios";

export const getPost = async (total: number) => {
  const { data }: any = await axios.get(
    `https://dummyjson.com/posts?limit=${total}`
  );
  return data;
};
