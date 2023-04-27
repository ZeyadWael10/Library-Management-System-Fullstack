import React, { useContext, useEffect } from 'react';

import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from 'react-router-dom';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import RootLayout from './Layout/RootLayout';
import Home from './Pages/LandingPage/Home';
import ProductsList from './Pages/Products/ProductsList';
import AddProducts from './Pages/Products/AddProducts';
import UpdateProduct from './Pages/Products/UpdateProduct';
import { Profile } from './Pages/Auth/Profile';
import { useUserContext } from './context/userContext.jsx';
import ProtectedRoute from './ProtectedRoute';
import BookContextProvider from './context/bookContext';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'products',
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
                        path: 'addBook',
                        element: (
                            <ProtectedRoute>
                                {' '}
                                <AddProducts />
                            </ProtectedRoute>
                        ),
                    },
                    {
                        path: 'updateBook/:bookId',
                        element: (
                            <ProtectedRoute>
                                <UpdateProduct />
                            </ProtectedRoute>
                        ),
                    },
                ],
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'register',
                element: <Register />,
            },
        ],
    },
]);

const App = () => {
    const { getUserFromLocalStorage, setIsLoggedIn } = useUserContext();

    useEffect(() => {
        if (getUserFromLocalStorage()) setIsLoggedIn(true);
        else <Navigate to="/login" />;
    }, []);

    return (
        <BookContextProvider>
            <RouterProvider
                router={router}
                fallbackElement={<h1>Loading...</h1>}
            />
        </BookContextProvider>
    );
};

export default App;
