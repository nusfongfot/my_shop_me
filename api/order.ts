import apiFetch from "@/helpers/interceptors";

//หน้าสั่งซื้อสินค้า
export const createOrderAPI = async (body: object) => {
  let path = `/orders`;
  const { data } = await apiFetch.post(path, body);
  return data;
};

export const cancelOrderAPI = async (orderId: number) => {
  let path = `/orders/${orderId}`;
  const { data } = await apiFetch.patch(path);
  return data;
};

export const getOrderIbByAPI = async (orderId: string) => {
  let path = `/orders/${orderId}`;
  const { data } = await apiFetch.get(path);
  return data;
};

export const historyOrderAPI = async (cus_id: number) => {
  let path = `/orders/history/${cus_id}`;
  const { data } = await apiFetch.get(path);
  return data;
};
