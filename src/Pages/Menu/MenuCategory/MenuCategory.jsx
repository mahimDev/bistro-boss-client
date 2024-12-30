import MenuItem from "../../Shared/MenuItem/MenuItem";

const MenuCategory = ({ data }) => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-2 gap-4">
            {
                data?.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
            }
        </div>
    );
};

export default MenuCategory;