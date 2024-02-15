import axios from "axios";
import { API_BASE_URL } from "../../api/apiConfig";
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

const signupRequest = () => ({ type: SIGNUP_REQUEST });
const signupSuccess = (user) => ({ type: SIGNUP_SUCCESS, payload: user });
const signupFailure = (error) => ({ type: SIGNUP_FAILURE, payload: error });

export const signup = (userData, navigate) => async (dispatch) => {
  dispatch(signupRequest());

  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = data;
    if (user.jwt) {
      localStorage.removeItem("jwt-token");
      localStorage.setItem("jwt-token", user.jwt);
    }
    dispatch(signupSuccess(user.jwt));
    navigate("/connect/facebook");
  } catch (error) {
    error.response && dispatch(signupFailure(error.response?.data));
  }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData, navigate) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    const user = data;
    if (user.jwt) {
      localStorage.removeItem("jwt-token");
      localStorage.setItem("jwt-token", user.jwt);
      dispatch(loginSuccess(user.jwt));
    }
    navigate("/connect/facebook");
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message));
  }
};

const getUserProfileRequest = () => ({ type: GET_USER_PROFILE_REQUEST });
const getUserProfileSuccess = (user) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: user,
});
const getUserProfileFailure = (error) => ({
  type: GET_USER_PROFILE_FAILURE,
  payload: error,
});

export const getUserProfile = (jwt, navigate) => async (dispatch) => {
  dispatch(getUserProfileRequest());
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const user = data;
    dispatch(getUserProfileSuccess(user));
  } catch (error) {
    navigate("/");
    dispatch(getUserProfileFailure(error.message));
  }
};

export const logout = (navigate) => async (dispatch) => {
  localStorage.removeItem("jwt-token");
  dispatch({ type: LOGOUT });
  navigate("/login");
};
