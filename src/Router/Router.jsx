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
import ManageItems from "../Pages/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Pages/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/Dashboard/UserHome/UserHome";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";

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
                path: 'userHome',
                element: <UserHome></UserHome>
            },
            {
                path: 'cart',
                element: <Cart></Cart>
            },
            {
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            // admin routes
            {
                path: 'adminHome',
                element:
                    <AdminRoute>
                        <AdminHome></AdminHome>
                    </AdminRoute>
            },
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
            {
                path: 'manageItems',
                element:
                    <AdminRoute>
                        <ManageItems></ManageItems>
                    </AdminRoute>
            },
            {
                path: 'updateItem/:id',
                element:
                    <AdminRoute>
                        <UpdateItem></UpdateItem>
                    </AdminRoute>,
                loader: ({ params }) => fetch(`https://bistro-boss-server-swart-nine.vercel.app/menu/${params.id}`)
            },
        ]
    }
])

export default router;