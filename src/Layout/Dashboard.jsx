import { FaCalendar, FaHome, FaMagic, FaRedRiver, FaShoppingCart } from "react-icons/fa";
import { FaBookBookmark } from "react-icons/fa6";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../Hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-600/75 ">
                <ul className="p-4">

                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/home'}>
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
                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/dashboard/booking'}>
                        <FaBookBookmark></FaBookBookmark>
                        My Booking</NavLink></li>
                    {/*  */}
                    <div className="divider"></div>

                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/'}>
                        <FaHome></FaHome>
                        Home</NavLink></li>
                    <li><NavLink className={'flex gap-2 items-center p-3'} to={'/order/dessert'}>
                        <FaMagic></FaMagic>
                        menu</NavLink></li>
                </ul>
            </div>
            <div className="flex-1 p-5">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;