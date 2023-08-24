import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const INITIAL_STATE = { user: {} };
  const loginReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { isAuthenticated: false, loading: true };
      case "LOGIN_SUCCESS":
        return {
          ...state,

          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
      case "LOGIN_FAIL":
        return { ...state, isAuthenticated: false, loading: false, user: {} };
      case "LOGOUT_SUCCESS":
        return { ...state, isAuthenticated: false, loading: false, user: {} };
      case "LOAD_USER_REQUEST":
        return { isAuthenticated: false, loading: true };
      case "LOAD_USER_SUCCESS":
        return {
          ...state,

          isAuthenticated: true,
          loading: false,
          user: action.payload,
        };
      case "LOAD_USER_FAIL":
        return { ...state, isAuthenticated: false, loading: false, user: {} };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(loginReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
