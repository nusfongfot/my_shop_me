import apiFetch from "@/helpers/interceptors";

export const getSelectedAddressAPI = async (cus_id: number) => {
  let path = `/address/selected/${cus_id}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const updatedSelectedAddressAPI = async (
  cus_id: number,
  body: object
) => {
  let path = `/address/selected/${cus_id}`;
  const { data } = await apiFetch.post(path, body);
  return data;
};

export const getAllAddressByIdAPI = async (cus_id: number) => {
  let path = `/address/${cus_id}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const editAddressByIDAPI = async (cus_id: number, body: object) => {
  let path = `/address/${cus_id}`;
  const { data } = await apiFetch.patch(path, body);
  return data;
};

export const createAddressAPI = async (body: object) => {
  let path = `/address`;
  const { data } = await apiFetch.post(path, body);
  return data;
};

export const deleteAddressAPIById = async (cus_id: number, add_id: number) => {
  let path = `/address/${cus_id}?add_id=${add_id}`;
  const { data } = await apiFetch.delete(path);
  return data;
};

export const getProvinceAPI = async () => {
  let path = `/address/province`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getAmphoeAPI = async (province: string) => {
  let path = `/address/amphoe?province=${province}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getTambonAPI = async (province: string, amphoe: string) => {
  let path = `/address/tambon?province=${province}&amphoe=${amphoe}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const getZipCodeAPI = async (
  province: string,
  amphoe: string,
  tambon: string
) => {
  let path = `/address/zipcode?province=${province}&amphoe=${amphoe}&tambon=${tambon}`;
  const { data } = await apiFetch.get(path);
  return data;
};
