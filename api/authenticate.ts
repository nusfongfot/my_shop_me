import apiFetch from "@/helpers/interceptors";

export const signUpAPI = async (body: object) => {
  let path = "/auth/register";
  const { data } = await apiFetch.post(path, body);
  return data;
};

export const signInAPI = async (body: object) => {
  let path = "/auth/login";
  const { data } = await apiFetch.post(path, body);
  return data;
};
