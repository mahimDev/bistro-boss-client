import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useCart from "../../Hooks/useCart";

const FoodCart = ({ food }) => {
    const { name, image, price, recipe, category, _id } = food
    const { user } = useAuth()
    const [, refetch] = useCart()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const location = useLocation()
    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menu_id: _id,
                email: user.email,
                menu_name: name,
                menu_image: image,
                menu_price: price
            }
            axiosSecure.post('/cart', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        toast.success(`${name} added successfully`)
                        // to update the cart item
                        refetch()
                    }
                })
        } else {
            Swal.fire({
                title: "you arenot logged in",
                text: "please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: location.pathname })
                }
            });
        }
    }
    return (
        <div>
            <div className="card  image-full  shadow-xl">
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
                        <button
                            onClick={handleAddToCart}
                            className="btn btn-ghost glass">ADD TO CART</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCart;