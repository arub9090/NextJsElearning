import { createContext, useReducer, useEffect } from "react";
import authReducer from "../reducer/authReducer";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
   dispatch({
    type: "LOGIN_USER",
    payload: JSON.parse(window.localStorage.getItem("user"))
   })
  }, [])
  

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
