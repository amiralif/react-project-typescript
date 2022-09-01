import {
  REGISTER_FAILED,
  REGISTER_IN_PROGRESS,
  REGISTER_SUCCESS,
} from "../action-types/index";

const initialValue = {
  loading: false,
  error: null,
  data: null,
};

export const registerReducer = (state = initialValue, action:any) => {
  switch (action.type) {
    case REGISTER_IN_PROGRESS:
      return { loading: true, error: null, data: null };
    case REGISTER_SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case REGISTER_FAILED:
      return { loading: false, error: action.payload, data: null };

    default:
      return state;
  }
};
