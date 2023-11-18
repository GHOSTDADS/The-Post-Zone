import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage';
import Splash from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register'
import Feed from './pages/Feed.jsx';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Splash />
            }, 
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Register />
            },
            // {
            //     path: '/user/:username',
            //     element: <Profile />
            // },
            {
                path: '/feed',
                element: <Feed />
            }
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)