import { create } from "zustand";

export const useAddUserSelected = create((set: any) => ({
  addUser: [
    {
      add_id: 0,
      road: "",
      home_no: "",
      detail: "",
      province: "",
      amphoe: "",
      tambon: "",
      zipcode: "",
    },
  ],
  setAddUser: (value: []) =>
    set((state: any) => ({
      ...state,
      addUser: value,
    })),
}));
