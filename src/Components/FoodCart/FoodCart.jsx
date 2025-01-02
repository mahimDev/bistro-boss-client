
const FoodCart = ({ food }) => {
    const { name, image, price, recipe, category } = food
    return (
        <div>
            <div className="card bg-base-100/30 image-full  shadow-xl">
                <figure>
                    <img
                        className="w-full"
                        src={image}
                        alt="dessert image" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-ghost glass">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;