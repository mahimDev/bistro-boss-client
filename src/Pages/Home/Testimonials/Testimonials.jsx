import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '@smastrom/react-rating/style.css';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

const Testimonials = () => {
    const [review, setReview] = useState([])
    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])
    return (
        <div>
            <SectionTitle
                title={'TESTIMONIALS'}
                subTitle={'What Our Clients Say'}
            />
            <div className="mx-10">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        review.map(item => <SwiperSlide
                            key={item._id}>
                            <div className="flex flex-col items-center  text-center mx-16 my-10">
                                <h1>
                                    {item?.name}
                                </h1>
                                <p>{item?.details.substring(0, 70)}...</p>
                                <Rating
                                    style={{ maxWidth: 250 }}
                                    value={item?.rating}
                                    readOnly={true}
                                />
                            </div>
                        </SwiperSlide>)
                    }

                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;