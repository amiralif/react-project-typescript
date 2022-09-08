import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RegisterTypes {
  status: string | null;
  data: PayloadAction | null | string | boolean;
}

export const register:any = createAsyncThunk(
  "register",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, getState }
  ) => {
    console.log("reg: ", email, password);
    try {
      const response = await axios.post("http://127.0.0.1:9000/auth/register", {
        email,
        password,
      });
      console.log(response);
      return response.data;
    } catch (e: any) {
      console.log("E: ", e);
      if (e.message === "Network Error") {
        return Promise.reject("Network Lost!!");
      } else {
        // login.rejected( e.response.data.message)
        return Promise.reject(e.response.data.message);
      }
    }
  }
);
const initialState: RegisterTypes = {
  data: null,
  status: null,
};
const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: {
    [register.pending]: (state, action) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "success";
    },
    [register.rejected]: (state, action) => {
      state.status = "failed";
      state.data = action.error.message;
    },
  },
});

export default registerSlice.reducer;
