import { create } from "zustand";

const useUserStore = create((set) => ({
  userName: "Brian",
  gmail: "info@gmail.com",
  img: "",
  setUser: (user) => set(user),
}));

export default useUserStore;
