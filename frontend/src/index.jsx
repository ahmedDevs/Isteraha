import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import './style.css';
import App from './App';
import Root from './routes/Root.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import Login from './routes/Login.jsx';
import Signup from './routes/Signup.jsx';
<<<<<<< HEAD
import CreateNetwork from './routes/CreateNetwork';
=======
import CreateNetwork from './routes/CreateNetwork.jsx';
import Profile from './routes/Profile.jsx';
>>>>>>> parent of b9c6542 (i)





const router = createBrowserRouter([
    {
        path: "/",
<<<<<<< HEAD
        element: <Root/>,
=======
        element: <Root />,
>>>>>>> parent of b9c6542 (i)
        errorElement: <ErrorPage />,
    },
    {
        path: "/login",
<<<<<<< HEAD
        element: <Login/>,
=======
        element: <Login />,
>>>>>>> parent of b9c6542 (i)
        errorElement: <ErrorPage />,
    },
    {
        path: "/signup",
<<<<<<< HEAD
        element: <Signup/>,
=======
        element: <Signup />,
>>>>>>> parent of b9c6542 (i)
        errorElement: <ErrorPage />,
    },
    {
        path: "/network/create",
<<<<<<< HEAD
        element: <CreateNetwork/>,
=======
        element: <CreateNetwork />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/:id/profile",
        element: <Profile />,
>>>>>>> parent of b9c6542 (i)
        errorElement: <ErrorPage />,
    }
    
    
    ]);

  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


