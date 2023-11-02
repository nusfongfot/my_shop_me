import apiFetch from "@/helpers/interceptors";

export const editProfileAPI = async (id: number, body: any) => {
  let path = `/profile/${id}`;
  const { data } = await apiFetch.put(path, body);
  return data;
};

export const getProfileByIDAPI = async (id: number) => {
  let path = `/profile/${id}`;
  const { data } = await apiFetch.get(path);
  return data;
};
