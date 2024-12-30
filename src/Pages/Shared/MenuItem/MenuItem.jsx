
const MenuItem = ({ item }) => {
    const { name, image, price, recipe, category } = item
    return (
        <div className="flex space-x-4">
            <img style={{ borderRadius: '0 200px 200px 200px ' }} className="w-48 " src={image} alt="" />
            <div>
                <h2 className="text-xl mb-2">{name}---------</h2>
                <p>{recipe}</p>
            </div>
            <p className="text-orange-400">$ {price}</p>
        </div>
    );
};

export default MenuItem;