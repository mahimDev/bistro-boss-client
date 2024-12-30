// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// import required modules
import { Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';

const Category = () => {
    return (
        <div>
            <SectionTitle
                subTitle={'From 11:00am to 10:00pm'}
                title={'ORDER ONLINE'}
            ></SectionTitle>
            <Swiper
                slidesPerView={5}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >

                {/* https://i.ibb.co.com/bggcrYY/slide1.jpg
                https://i.ibb.co.com/Y8PHTFg/slide4.jpg
                 */}
                <SwiperSlide>
                    <img src=" https://i.ibb.co.com/bggcrYY/slide1.jpg" alt="" />
                    <h1 className='-mt-16 text-center text-2xl text-white'>salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co.com/Y8PHTFg/slide4.jpg" alt="" />
                    <h1 className='-mt-16 text-center text-2xl text-white'>salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co.com/bggcrYY/slide1.jpg" alt="" />
                    <h1 className='-mt-16 text-center text-2xl text-white'>salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co.com/bggcrYY/slide1.jpg" alt="" />
                    <h1 className='-mt-16 text-center text-2xl text-white'>salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co.com/bggcrYY/slide1.jpg" alt="" />
                    <h1 className='-mt-16 text-center text-2xl text-white'>salad</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co.com/bggcrYY/slide1.jpg" alt="" />
                    <h1 className='-mt-16 text-center text-2xl text-white'>salad</h1>
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Category;