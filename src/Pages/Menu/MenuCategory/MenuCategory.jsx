import { Link } from "react-router-dom";
import CoverSection from "../../../Components/CoverSection/CoverSection";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ data, title, img }) => {
    // console.log(data)
    return (
        <div>
            {title && <CoverSection img={img} title={title} />}
            <div className="grid lg:grid-cols-2 grid-cols-2 gap-4 mt-10">
                {
                    data?.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
            <div className="my-10 flex justify-center">
                <Link to={`/order/${title}`}><button className="py-2 px-5 rounded-xl border-b-4 mt-5 text-black">Order Now {title}</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;