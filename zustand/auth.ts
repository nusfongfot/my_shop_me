import { create } from "zustand";

const useAuth = create((set: any) => ({
  auth: {
    cus_id: 0,
    name: "",
    surname: "",
    phone: "",
    email: "",
    username: "",
    photo_user: "",
  },
  accInfo: {},
  setAuth: (value: object) =>
    set((state: any) => ({
      auth: value,
    })),
  setAccInfo: (value: object) =>
    set((state: any) => ({
      accInfo: value,
    })),
}));

export default useAuth;
