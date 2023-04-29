import axios from "axios";
import React, { createContext, useContext, useState } from "react";

let UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));

    setIsAdmin(user.isAdmin);
  };
  const getUserFromLocalStorage = () => {
    if (localStorage.getItem("user"))
      return JSON.parse(localStorage.getItem("user"));
    return false;
  };
  const saveTokenToLocalStorage = (token) => {
    localStorage.setItem("token", token);
  };
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("token");
  };

  // Auth
  const registerUser = async (user) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/signup",
      user
    );
    return data;
  };
  const loginUser = async (user) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      user
    );

    if (data.Token) {
      saveTokenToLocalStorage(data.Token);
      saveUserToLocalStorage(data.User);
    }

    return data;
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isAdmin,
        setIsLoggedIn,
        setIsAdmin,
        saveUserToLocalStorage,
        getUserFromLocalStorage,
        saveTokenToLocalStorage,
        getTokenFromLocalStorage,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
