import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './style.css';
import App from './App';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
import CreateNetwork from './routes/CreateNetwork.jsx';
import Profile from './routes/Profile.jsx';





const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
        element: <Signup />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/network/create",
        element: <CreateNetwork />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/:id/profile",
        element: <Profile />,
        errorElement: <ErrorPage />,
    }
    
    
    ]);

  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


