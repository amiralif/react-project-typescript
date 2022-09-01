import {
  LOGIN_FAILED,
  LOGIN_IN_PROGRESS,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../action-types";


const initialValue = { loading: false, error: null, data: null };

export const loginReducer = (state = initialValue, action:any) => {
  switch (action.type) {
    case LOGIN_IN_PROGRESS:
      return { loading: true, error: null, data: null };
    case LOGIN_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case LOGIN_FAILED:
      return { loading: false, error: action.payload, data: null };
    case LOGOUT:
      return { loading: false, error: null, data: null };
    default:
      return state;
  }
};
