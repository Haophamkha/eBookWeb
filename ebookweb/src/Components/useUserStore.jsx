
import { create } from "zustand";

const persistedUser = JSON.parse(localStorage.getItem("userState")) || {
  userId: null,
  userName: "",
  gmail: "",
  img: "",
  isLoggedIn: false,
};

const useUserStore = create((set) => ({
  userId: persistedUser.userId,
  userName: persistedUser.userName,
  gmail: persistedUser.gmail,
  img: persistedUser.img,
  isLoggedIn: persistedUser.isLoggedIn,

  setUser: (userData) => {
    const newState = {
      userId: userData.id, 
      userName: userData.userName,
      gmail: userData.gmail,
      img: userData.img,
      isLoggedIn: true,
    };

    localStorage.setItem("userState", JSON.stringify(newState));
    set(newState);
  },

  clearUser: () => {
    const clearedState = {
      userId: null,
      userName: "",
      gmail: "",
      img: "",
      isLoggedIn: false,
    };

    localStorage.removeItem("userState");
    set(clearedState);
  },
}));

export default useUserStore;
