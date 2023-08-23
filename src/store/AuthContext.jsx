import React, { createContext, useReducer } from "react";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const INITIAL_STATE = { user: {}, loading: false, isAuthenticated: false };
  const loginReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
        return { ...state, loading: true, isAuthenticated: false };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          user: action.payload,
        };
      case "LOGOUT_SUCCESS":
        return { ...state, loading: false, isAuthenticated: false, user: {} };
      case "LOGIN_FAIL":
        return { ...state, loading: false, isAuthenticated: false, user: {} };

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
