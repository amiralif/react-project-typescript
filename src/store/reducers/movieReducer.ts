import _ from "lodash";

import {
  CREATE_MOVIE,
  DELETE_MOVIE,
  MOVIE_LIST,
  UPDATE_MOVIE,
  VIEW_MOVIE,
} from "../action-types";

export const movieReducer = (state:any = {}, action:any) => {
  switch (action.type) {
    case MOVIE_LIST:
      return { ...state.movie, ..._.mapKeys(action.payload, "id") };
    case VIEW_MOVIE:
      return { ...state.movie, [action.payload.id]: action.payload };
    case CREATE_MOVIE:
      return { ...state.movies, [action.payload.id]: action.payload };
    case UPDATE_MOVIE:
      return { ...state.movie, [action.payload.id]: action.payload };
    case DELETE_MOVIE:
      return _.omit(state.movies, action.payload);
    default:
      return state;
  }
};
