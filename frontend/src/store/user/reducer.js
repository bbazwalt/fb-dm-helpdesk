import {
  GET_USER_PROFILE_FAILURE,
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
} from "./actionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SIGNUP_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_PROFILE_REQUEST:
      return { ...state, isLoading: true, error: null };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, error: null, jwt: payload };
    case GET_USER_PROFILE_SUCCESS:
      return { ...state, isLoading: false, error: null, user: payload };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_PROFILE_FAILURE:
      return { ...state, isLoading: false, error: payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
