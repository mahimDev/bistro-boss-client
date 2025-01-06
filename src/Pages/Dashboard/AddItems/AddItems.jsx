import { useForm } from "react-hook-form";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AddItems = () => {
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)

    return (
        <div>
            <SectionTitle subTitle={"what's new?"} title="ADD an items"></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name")} />

                    <select {...register("category")} class="select select-bordered w-full max-w-xs">
                        <option disabled selected>select a category</option>
                        <option value="dessert">dessert</option>
                        <option value="salad">salad</option>
                        <option value="pizza">pizza</option>
                        <option value="soup">soup</option>
                    </select>
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
};

export default AddItems;