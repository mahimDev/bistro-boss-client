import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu";
import Order from "../Pages/Order/Order";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import PrivateRoute from "../Private/PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AddItems from "../Pages/Dashboard/AddItems/AddItems";
import AdminRoute from "../Private/AdminRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'menu',
                element: <Menu></Menu>
            },
            {
                path: 'order/:category',
                element: <Order></Order>
            },
        ]
    },
    {
        path: 'login',
        element: <Login></Login>
    },
    {
        path: 'register',
        element: <Register></Register>
    },
    {
        path: 'dashboard',
        element:
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>,
        children: [
            // normal users routes
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            // admin routes
            {
                path: 'allUsers',
                element:
                    <AdminRoute>
                        <AllUsers></AllUsers>
                    </AdminRoute>
            },
            {
                path: 'addItems',
                element:
                    <AdminRoute>
                        <AddItems></AddItems>
                    </AdminRoute>
            },
        ]
    }
])

export default router;