import {
  
  REGISTER_FAILED,
  REGISTER_IN_PROGRESS,
  REGISTER_SUCCESS,
} from "../action-types/index";

import axios from "axios";

export const register = (email:string, password:string) => {
  return async (dispatch:any) => {
    dispatch({ type: REGISTER_IN_PROGRESS });

    try {
      const result = await axios.post("http://127.0.0.1:9000/auth/register", {
        email,
        password,
      });
      //   const decodedData = jwtDecode(result.data.access_token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: "OK",
      });
    } catch (e:any) {
      
      dispatch({ type: REGISTER_FAILED, payload: e.response.data.message });
    }
  };
};
