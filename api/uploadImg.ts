import apiFetch from "@/helpers/interceptors";

export const uploadSingleImage = async (body: object) => {
  let path = `/upload`;
  const { data } = await apiFetch.post(path, body);
  return data;
};
