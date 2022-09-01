import {
  LOGIN_FAILED,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types";

import { toast } from "react-toastify";

import axios from "axios";
import jwtDecode from "jwt-decode";

export const login = (email: string, password: string) => {
  return async (dispatch: any) => {
    dispatch({ type: LOGIN_IN_PROGRESS });

    try {
      const result = await axios.post("http://127.0.0.1:9000/auth/login", {
        email,
        password,
      });
      const decodedToken: { email: string; iat: string; exp: string } =
        jwtDecode(result.data.access_token);

      localStorage.setItem("token", result.data.access_token);
      localStorage.setItem("email", decodedToken.email);
      localStorage.setItem("iat", decodedToken.iat);
      localStorage.setItem("exp", decodedToken.exp);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          token: result.data.access_token,
          email: decodedToken.email,
          iat: decodedToken.iat,
          exp: decodedToken.exp,
        },
      });
      dispatch(automaticLogout(decodedToken.exp));
    } catch (e: any) {
      console.log("E: ", e);
      if (e.message === "Network Error") {
        dispatch({ type: LOGIN_FAILED, payload: "Network Lost!!" });
      } else {
        dispatch({ type: LOGIN_FAILED, payload: e.response.data.message });
      }
    }
  };
};

export const logout = (type: string = "") => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("iat");
  localStorage.removeItem("exp");
  if (type === "normal") {
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
  return { type: LOGOUT };
};

export const automaticLogout = (expireTime: string) => {
  const milliSecondsToActive =
    new Date(parseInt(expireTime) * 1000).getTime() - new Date().getTime();
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch(logout("normal"));
    }, milliSecondsToActive);
  };
};

export const checkAuthenticateStatus = () => {
  return (dispatch: any) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expT: any = localStorage.getItem("exp");
      const iatT:any = localStorage.getItem("iat");
      const expireTime = new Date(parseInt(expT) * 1000);
      if (expireTime <= new Date()) {
        dispatch(logout());
      } else {
        const email = localStorage.getItem("email");
        const exp = parseInt(expT);
        const iat = parseInt(iatT);

        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token, email, exp, iat },
        });
      }
    }
  };
};
