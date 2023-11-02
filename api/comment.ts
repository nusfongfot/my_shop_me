import apiFetch from "@/helpers/interceptors";


export const getCommentsProductByIdAPI = async (pro_id: string) => {
  let path = `/comments/${pro_id}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const createCommentsProductAPI = async (body: object) => {
  let path = `/comments`;
  const { data } = await apiFetch.post(path, body);
  return data;
};
