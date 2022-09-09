import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

interface LoginTypes {
  status: string | null;
  data: PayloadAction | null | string | boolean;
}

export const login: any = createAsyncThunk(
  "login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, getState }
  ) => {
    console.log({ email, password });
    try {
      const response = await axios.post("http://127.0.0.1:9000/auth/login", {
        email,
        password,
      });
      console.log(response);
      const decodedToken: {
        email: string;
        iat: string | bigint;
        exp: string | bigint;
      } = jwtDecode(response.data.access_token);

      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("iat", decodedToken.iat.toString());
      localStorage.setItem("exp", decodedToken.exp.toString());
      return response.data;
    } catch (e: any) {
      console.log("E: ", e);
      if (e.message === "Network Error") {
        return Promise.reject("Network Lost!!");
      } else {
        return Promise.reject(e.response.data.message);
      }
    }
  }
);
const initialState: LoginTypes = {
  data: null,
  status: null,
};
const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state, logoutType) => {
      console.log("LOGOUT");
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("iat");
      localStorage.removeItem("exp");
      state.status = "logout";
      state.data = null;
      if (logoutType.payload === "normal") {
        toast.error("You were Logged Out !", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [login.rejected]: (state, action) => {
      state.status = "failed";
      state.data = action.error.message;
    },
  },
});
export const { logout } = loginSlice.actions;

export const checkAuthenticateStatus =
  () => (dispatch: Dispatch<PayloadAction>) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.log("CHECK1 LOGOUT");

      dispatch(logout(""));
    } else {
      const exp: string = localStorage.getItem("exp") || "";
      const expireTime = new Date(parseInt(exp) * 1000);
      if (expireTime <= new Date()) {
        console.log("CHECK2 LOGOUT");
        dispatch(logout(""));
      } else {
        console.log("CHECK login");
        dispatch(login.fulfilled());
      }
    }
  };

export const automaticLogout =
  (expireTime: number) => (dispatch: Dispatch<PayloadAction>) => {
    console.log("AUTO");
    console.log(expireTime);
    const milliSecondsToActive =
      new Date(expireTime * 1000).getTime() - new Date().getTime();
    console.log(milliSecondsToActive);
    setTimeout(() => {
      console.log("AUTO OUT");
      dispatch(logout("normal"));
    }, milliSecondsToActive);
  };
export default loginSlice.reducer;
