import apiFetch from "@/helpers/interceptors";
import axios from "axios";

export const getCate = async () => {
  let path = `/products/categories`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getProducts = async (page: number, total: number) => {
  let path = `/products?offSet=${page}&limit=${total}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getProductByIDAPI = async (id: any) => {
  let path = `/products/${id}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getCateOfProduct = async (type: string) => {
  let path = `/products/category?cate=${type}&offSet=0&limit=30`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const searchProducts = async (query: string) => {
  let path = `/products/search?q=${query}&offSet=0&limit=10`;
  const { data } = await apiFetch.get(path);
  return data; 
};

export const getPriceRangeAPI = async (start: any,end: any) => {
  let path = `/products/price?start=${start}&end=${end}`;
  const { data } = await apiFetch.get(path);
  return data; 
};


0
