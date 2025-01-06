import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaStar, FaTrash, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosSecure.get('/users')
            return response.data
        }
    })
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
                axiosSecure.delete(`/user/${id}`)
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
    const handleManageUser = user => {
        axiosSecure.patch(`/user/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success(`${user.user_name} is Admin now !`)
                }
            })
    }
    return (
        <div>
            <div className="flex justify-evenly my-5">
                <h1 className="text-3xl "> All Users</h1>
                <h1 className="text-3xl ">Total Users :{users.length}</h1>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            users.map((user, i) =>
                                <tr key={user._id}>
                                    <th>{i + 1}</th>
                                    <td>{user.user_name}</td>
                                    <td>{user.user_email}</td>
                                    <td>
                                        {
                                            user.role === 'admin'
                                                ?
                                                "Admin"
                                                :
                                                <button
                                                    onClick={() => handleManageUser(user)}
                                                    className="btn bg-orange-400"><FaUsers></FaUsers>
                                                </button>
                                        }
                                    </td>
                                    <td>

                                        {
                                            user.role === 'admin'
                                                ?
                                                "Admin"
                                                :
                                                <button
                                                    onClick={() => handleDeleteBtn(user._id)}
                                                    className="btn  text-red-600"><FaTrash></FaTrash>
                                                </button>
                                        }
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;