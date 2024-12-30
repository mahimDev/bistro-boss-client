import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const Featured = () => {
    return (
        <div className="bg-featureImg  text-white pt-5 my-20 bg-fixed ">
            <SectionTitle
                title={'Featured Item'}
                subTitle={'check it out'}
            />

            <div className="md:flex items-center py-20 px-16 ">
                <div>
                    <img className="rounded-sm " src="https://i.ibb.co.com/pbHJnNZ/featured.jpg" alt="" />
                </div>
                <div className="md:ml-10">
                    <p>January 1 , 2025</p>
                    <p className="uppercase my-2 text-xl">Where can i get some ?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio vel id minus eius maxime quod ipsam similique odit nisi culpa, illum perspiciatis itaque et at doloremque. Debitis dolorum a perferendis!</p>
                    <button className="py-2 px-5 rounded-xl border-b-4 mt-5 text-black">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;