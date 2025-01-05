import { FaTrash } from "react-icons/fa";
import useCart from "../../../Hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Cart = () => {
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.menu_price, 0)
    const axiosSecure = useAxiosSecure()
    const handleDeleteBtn = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "Your item has been deleted",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cart/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Item has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <div className="flex justify-evenly my-5 ">
                <h1 className="text-4xl">Item : {cart?.length}</h1>
                <h1 className="text-4xl">Total Price : {totalPrice}</h1>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>image</th>
                            <th>name</th>
                            <th>price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            cart.map((item, i) =>
                                <tr key={item._id}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.menu_image}
                                                        alt="menu image" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.menu_name}
                                    </td>
                                    <td> {item.menu_price}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDeleteBtn(item._id)}
                                            className="btn btn-ghost text-red-600 ">
                                            <FaTrash></FaTrash>
                                        </button>
                                    </th>
                                </tr>
                            )
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Cart;