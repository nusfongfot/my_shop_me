import axios from "axios";

export const getProducts = async (page: number, total: number) => {
  const { data }: any = await axios.get(
    `https://dummyjson.com/products?skip=${page}&limit=${total}`
  );
  return data;
};

export const getCate = async () => {
  const { data }: any = await axios.get(
    "https://dummyjson.com/products/categories"
  );
  return data;
};

export const getCateOfProduct = async (type: string) => {
  const { data }: any = await axios.get(
    `https://dummyjson.com/products/category/${type}`
  );
  return data;
};

export const searchProducts = async (type: string) => {
  const { data }: any = await axios.get(
    `https://dummyjson.com/products/search?q=${type}`
  );
  return data;
};

export const getProduct = async (id: any) => {
  const { data }: any = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};
