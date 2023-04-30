import React, { useContext, useEffect } from "react";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import RootLayout from "./Layout/RootLayout";
import Home from "./Pages/LandingPage/Home";
import ProductsList from "./Pages/Products/ProductsList";
import AddProducts from "./Pages/Products/AddProducts";
import UpdateProduct from "./Pages/Products/UpdateProduct";
import { Profile } from "./Pages/Auth/Profile";
import { useUserContext } from "./context/userContext.jsx";
import ProtectedRoute from "./ProtectedRoute";
import BookContextProvider from "./context/bookContext";
import ForgetPassword from "./Pages/Auth/ForgetPassword";
import GetEmail from "./Pages/Auth/GetEmail";
import ProfileLayout from "./Pages/UserProfile/ProfileLayout";
import UpdateAccount from "./Pages/UserProfile/UpdateAccount";
import UpdatePassword from "./Pages/UserProfile/UpdatePassword";
import CartItems from "./Pages/Products/CartItems";

import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <ProfileLayout />,
        children: [
          {
            path: "",
            element: <Profile />,
          },
          {
            path: "update-account",
            element: <UpdateAccount />,
          },
          {
            path: "new-password",
            element: <UpdatePassword />,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <ProductsList />
              </ProtectedRoute>
            ),
          },
          {
            path: "addBook",
            element: (
              <ProtectedRoute>
                {" "}
                <AddProducts />
              </ProtectedRoute>
            ),
          },
          {
            path: "cart-items",
            element: (
              <ProtectedRoute>
                {" "}
                <CartItems />
              </ProtectedRoute>
            ),
          },
          {
            path: "updateBook/:bookId",
            element: (
              <ProtectedRoute>
                <UpdateProduct />
              </ProtectedRoute>
            ),
          },
        ],
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "get-email",
        element: <GetEmail />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
    ],
  },
]);

const App = () => {
  const {
    getUserFromLocalStorage,
    setIsLoggedIn,
    setIsAdmin,
    userBorrowedBooks,
    setUserBorrowedBooks,
  } = useUserContext();
  const user = getUserFromLocalStorage();

  useEffect(() => {
    if (user) {
      setIsAdmin(user.isAdmin);
      setUserBorrowedBooks([...userBorrowedBooks, ...user.borrowedBooks]);
      setIsLoggedIn(true);
    } else <Navigate to="/login" />;
  }, []);

  return (
    <BookContextProvider>
      <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
      <ToastContainer />
    </BookContextProvider>
  );
};

export default App;
