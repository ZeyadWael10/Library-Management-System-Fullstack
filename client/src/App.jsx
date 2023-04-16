import React from 'react';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import RootLayout from './Layout/RootLayout';
import Home from './Pages/LandingPage/Home';
import ProductsList from './Pages/Products/ProductsList';
import AddProducts from './Pages/Products/AddProducts';
import UpdateProduct from './Pages/Products/UpdateProduct';
import { Profile } from './Pages/Auth/Profile';

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
                        element: <ProductsList />,
                    },
                    {
                        path: 'addBook',
                        element: <AddProducts />,
                    },
                    {
                        path: 'updateBook/:bookId',
                        element: <UpdateProduct />,
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
    return (
        <RouterProvider router={router} fallbackElement={<h1>Loading...</h1>} />
    );
};

export default App;
