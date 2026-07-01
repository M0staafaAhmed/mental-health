import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import type { UserInfoType } from "../../Types/Types";

const initialState = (): UserInfoType => {
  const userInfo = localStorage.getItem("userInfo");
  if (userInfo) {
    return JSON.parse(userInfo);
  } else {
    return {
      token: "",
      user: {
        id: 0,
        name: "",
        email: "",
        phone: "",
        gender: "",
        dateOfBirth: ""
      },
      stats: {
        totalTests: 0,
        lastScore: null,
      },
    };
  }
};

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.stats = action.payload.stats;
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    clearUserInfo: (state) => {
      state.token = "";
      state.user = { id: 0, name: "", email: "", phone: "", gender: "", dateOfBirth: "" };
      state.stats = { totalTests: 0, lastScore: null };
      localStorage.removeItem("userInfo");
      toast.success("Logged out successfully!");
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
      localStorage.setItem("userInfo", JSON.stringify(state));
    },
    test: (state) => {
      console.log("Current User Info:", state);
    },
  },
});

export const { setUserInfo, clearUserInfo, updateStats, test } =
  userInfoSlice.actions;
export const userInfoReducer = userInfoSlice.reducer;
