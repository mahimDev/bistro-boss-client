import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useMenu from "../../../Hooks/useMenu";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, loading, refetch] = useMenu()
    const axiosSecure = useAxiosSecure()
    const handleDeleteBtn = item => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(item)
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted.`,
                        icon: "success"
                    });
                }

            }
        });
    }
    if (loading) {
        return <progress className="progress w-56"></progress>
    }
    return (
        <div>
            <SectionTitle subTitle="Hurry up" title="Manage All items"></SectionTitle>
            <div>
                <h1 className="text-4xl my-5">Total Item : {menu?.length}</h1>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>image</th>
                                <th>Item name</th>
                                <th>price</th>
                                <th>Update</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                menu.map((item, i) =>
                                    <tr key={item._id}>
                                        <th>
                                            {i + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="menu image" />
                                                    </div>
                                                </div>

                                            </div>
                                        </td>
                                        <td >
                                            {item.name}
                                        </td>
                                        <td > {item.price}</td>
                                        <td>
                                            <Link
                                                to={`/dashboard/updateItem/${item._id}`}
                                            >
                                                <button
                                                    className="btn btn-ghost text-green-600 ">
                                                    <FaEdit />
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                onClick={() => handleDeleteBtn(item)}
                                                className="btn btn-ghost text-red-600 ">
                                                <FaTrash></FaTrash>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }


                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;