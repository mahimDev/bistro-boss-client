import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";

const PopulerMenu = () => {
    const [menu] = useMenu()
    const filterMenu = menu.filter(item => item.category === "popular")

    // console.log(menu)
    return (
        <div>
            <SectionTitle
                subTitle={'Populer Item'}
                title={'form our menu'}
            />
            <div className="grid lg:grid-cols-2 grid-cols-2 gap-4">

                {
                    filterMenu?.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
                }
            </div>
        </div>
    );
};

export default PopulerMenu;