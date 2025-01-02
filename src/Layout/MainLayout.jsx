import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBer from "../Pages/Shared/NavBer/NavBer";
import { ToastContainer } from "react-toastify";


const MainLayout = () => {
    return (
        <div >
            <ToastContainer />
            <NavBer></NavBer>
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;