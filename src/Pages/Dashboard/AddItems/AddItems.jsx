import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const AddItems = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);
            const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(image_hosting_api, imageFile, {
                headers: {
                    'content-Type': 'multipart/form-data'
                }
            })
            if (res.data.success) {
                // now send the menu data to server side
                const menuItem = {
                    name: data.name,
                    image: res.data.data.display_url,
                    category: data.category,
                    price: data.price,
                    recipe: data.recipe,
                }
                const menuRes = await axiosSecure.post('/menu', menuItem)
                if (menuRes.data.insertedId) {

                    Swal.fire({
                        position: 'top-start',
                        icon: 'success',
                        iconColor: 'orange',
                        title: `${data.name} is added successfully`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            }
        } finally {
            setIsSubmitting(false);
        }

    }

    return (
        <div>
            <SectionTitle subTitle={"what's new?"} title="ADD an items"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <div className="label">
                            <span className="label-text">Recipe Name *</span>
                        </div>
                        <input
                            {...register("name")}
                            type="text"
                            placeholder="Type here"
                            className="input input-bordered w-full " />

                    </div>
                    <div className="flex gap-5 mt-5">
                        {/* category */}

                        <div className="flex-1">
                            <div className="label">
                                <span className="label-text">Category *</span>
                            </div>
                            <select {...register("category")}
                                // defaultValue={"default"}
                                className="select select-bordered w-full">
                                <option disabled>select a category</option>
                                <option value="dessert">dessert</option>
                                <option value="salad">salad</option>
                                <option value="pizza">pizza</option>
                                <option value="soup">soup</option>
                            </select>

                        </div>
                        {/* price */}
                        <div className="flex-1">
                            <div className="label">
                                <span className="label-text">Price *</span>
                            </div>
                            <input
                                {...register("price")}
                                type="text"
                                placeholder="Type here"
                                className="input input-bordered w-full " />

                        </div>
                    </div>
                    {/* Recipe Details  */}
                    <div className="">
                        <div className="label">
                            <span className="label-text">Recipe Details *</span>
                        </div>
                        <textarea
                            {...register("recipe", { required: "Recipe details are required" })}
                            className="w-full border rounded-lg p-4"
                            placeholder="Type here"
                            rows={5}
                        ></textarea>


                    </div>
                    <div>
                        <input
                            {...register("image")}
                            type="file"
                            className="file-input file-input-bordered w-full max-w-xs mt-5" />
                    </div>
                    <button
                        disabled={isSubmitting}
                        className={`py-3 px-10 font-semibold mt-5 rounded-md ${isSubmitting ? "bg-gray-400" : "bg-orange-500"
                            }`}
                    >
                        {isSubmitting ? "Submitting..." : "ADD ITEM"}
                    </button>;
                </form>
            </div>
        </div>
    );
};

export default AddItems;