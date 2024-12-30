import { Helmet } from "react-helmet-async";
import CoverSection from "../../Components/CoverSection/CoverSection";
import Featured from "../Home/Featured/Featured";
import MenuItem from "../Shared/MenuItem/MenuItem";
import PopulerMenu from "../Home/PopulerMenu/PopulerMenu";
import useMenu from "../../Hooks/useMenu";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import MenuCategory from "./MenuCategory/MenuCategory";

// 
// 
// https://i.ibb.co.com/jL3NC2v/menu-bg.png
// 
// 
// 
const Menu = () => {
    const [menu] = useMenu()
    const offered = menu.filter(item => item.category === "offered")
    const dessert = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    return (
        <div>
            <Helmet>
                <title>Boss | Menu</title>
            </Helmet>
            {/* our menu section */}
            <div>
                <CoverSection
                    img={'https://i.ibb.co.com/w6SpJpX/banner3.jpg'}
                    title={'our menu'}
                    p={'would you to try a dish?'}
                ></CoverSection>
                <SectionTitle
                    title="don't miss"
                    subTitle="today's offerd"
                ></SectionTitle>
                <MenuCategory data={offered}></MenuCategory>
            </div>
            {/* dessert section */}
            <div className="mt-14">
                <CoverSection
                    img={'https://i.ibb.co.com/N1YMwQ8/dessert-bg.jpg'}
                    title={'dessert'}
                    p={'dessert is to much sweet'}
                ></CoverSection>
                <div className="mt-10">
                    <MenuCategory data={dessert}></MenuCategory>
                </div>
            </div>
            {/* pizza section */}
            <div className="mt-14">
                <CoverSection
                    img={'https://i.ibb.co.com/s1LHKLp/pizza-bg.jpg'}
                    title={'Pizza'}
                    p={'pizza is to much '}
                ></CoverSection>
                <div className="mt-10">
                    <MenuCategory data={pizza}></MenuCategory>
                </div>
            </div>
            {/* salad section */}
            <div className="mt-14">
                <CoverSection
                    img={'https://i.ibb.co.com/Fg7Q97P/salad-bg.jpg'}
                    title={'salad'}
                    p={'salad is to much '}
                ></CoverSection>
                <div className="mt-10">
                    <MenuCategory data={salad}></MenuCategory>
                </div>
            </div>
            {/* soup section */}
            <div className="mt-14">
                <CoverSection
                    img={'https://i.ibb.co.com/GdY5s94/soup-bg.jpg'}
                    title={'soup'}
                    p={'soup is to much '}
                ></CoverSection>
                <div className="mt-10">
                    <MenuCategory data={soup}></MenuCategory>
                </div>
            </div>


        </div>
    );
};

export default Menu;