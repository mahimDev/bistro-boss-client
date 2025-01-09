import { FaCalendar, FaHome, FaList, FaMagic, FaPhoneAlt, FaRedRiver, FaShoppingCart, FaUser, FaUtensils } from "react-icons/fa";
import { FaBookBookmark, FaUserGroup } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAdmin from "../Hooks/useAdmin";
import { ToastContainer } from "react-toastify";

const Dashboard = () => {
    const [isAdmin] = useAdmin()
    const [cart] = useCart()
    return (
        <div className="flex">
            <ToastContainer />
            <div className="w-64 min-h-screen bg-orange-600/75 ">
                <ul className="p-4">
                    {
                        isAdmin
                            ?
                            <>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/adminHome'}>
                                    <FaHome></FaHome>
                                    Admin Home</NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/addItems'}>
                                    <FaUtensils></FaUtensils>
                                    Add Items </NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/manageItems'}>
                                    <FaList></FaList>
                                    Manage Items</NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/manageBookings'}>
                                    <FaBookBookmark></FaBookBookmark>
                                    Manage Bookings</NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/allUsers'}>
                                    <FaUserGroup></FaUserGroup>
                                    All Users</NavLink></li>
                            </>
                            :
                            <>

                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/userHome'}>
                                    <FaHome></FaHome>
                                    User Home</NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/cart'}>
                                    <FaShoppingCart></FaShoppingCart>
                                    My Cart ( {cart.length} ) </NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/reservation'}>
                                    <FaCalendar></FaCalendar>
                                    Reservation</NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/review'}>
                                    <FaRedRiver></FaRedRiver>
                                    Add Review</NavLink></li>
                                <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/paymentHistory'}>
                                    <FaBookBookmark></FaBookBookmark>
                                    My Booking</NavLink></li>
                            </>
                    }
                    {/*  */}
                    <div className="divider"></div>

                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/'}>
                        <FaHome></FaHome>
                        Home</NavLink></li>
                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/order/dessert'}>
                        <FaMagic></FaMagic>
                        menu</NavLink></li>
                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/order/dessert'}>
                        <FaPhoneAlt></FaPhoneAlt>
                        Contact</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;