import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBer from "../Pages/Shared/NavBer/NavBer";


const MainLayout = () => {
    return (
        <div >
            <NavBer></NavBer>
            <Outlet />
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;