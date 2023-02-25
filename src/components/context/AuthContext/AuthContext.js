import { createContext, useReducer } from "react";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  FETCH_PROFILE_FAIL,
  FETCH_PROFILE_SUCCESS,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./authActionTypes";
import { API_URL_USER } from "../../../utils/apiURL";

//Create auth context
export const authContext = createContext();

//Create the initial state with default values
//This allows us to track the authentication status of the user
const INITIAL_STATE = {
  userAuth: JSON.parse(localStorage.getItem("userAuth")),  
  error: null,
  loading: false,
  profile: null,
};

//Auth Reducer
//This accepts the dispatch from Provider userReducer and checks the action, then makes changes to the Initial State
const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    //Register
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };

    case LOGIN_SUCCESS:
      //Add user to localstorage
      localStorage.setItem("userAuth", JSON.stringify(payload));
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: payload,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
        userAuth: null,
      };
    // Profile
    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        profile: payload,
      };
    case FETCH_PROFILE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
        profile: null,
      };
    // Logout
    case LOGOUT:
      //Remove user from localstorage
      localStorage.removeItem("userAuth");
      return {
        ...state,
        loading: false,
        error: null,
        userAuth: null,
      };
    default:
      return state;
  }
};

//Create Provider - this serves as the high order compenent. 
const AuthContextProvider = ({ children }) => {
  //Destructure the state, then use the dispatch function to update the state
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  //Login action
  const loginUserAction = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${API_URL_USER}/login`, formData, config);
      if (res?.data?.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      }
      //Redirect
      window.location.href = "/dashboard"; //Redirect the user back to the dashboard
    } catch (error) {
      dispatch({
        type: LOGIN_FAILED,
        payload: error?.response?.data?.message,
      });
    }
  };

  //Login action
  const registerUserAction = async formData => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        `${API_URL_USER}/register`,
        formData,
        config
      );
      if (res?.data?.status === "success") {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });
      }
      //Redirect
      window.location.href = "/login"; //Redirect the user to the login page if login fails
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

  //Profile Action
  const fetchProfileAction = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${state?.userAuth?.token}`, 
        },
      };
      const res = await axios.get(`${API_URL_USER}/profile`, config);
      console.log(res);
      if (res?.data) {
        dispatch({
          type: FETCH_PROFILE_SUCCESS,
          payload: res.data,
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PROFILE_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };
  //Logout
  const logoutUserAction = () => {
    dispatch({
      type: LOGOUT,
      payload: null,
    });
    //Redirect back to login page
    window.location.href = "/login"; //Redirect the user to the login page
  };
  return (
    <authContext.Provider
      value={{
        loginUserAction,
        userAuth: state,
        token: state?.userAuth?.token,
        fetchProfileAction,
        profile: state?.profile,
        error: state?.error,
        logoutUserAction,
        registerUserAction,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
