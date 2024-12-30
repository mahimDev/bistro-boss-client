import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Banner = () => {
    return (
        <div className="">
            <Carousel
                autoPlay={true}
            >
                <div className="h-[80vh]">
                    <img src="https://i.ibb.co.com/8xStVBv/6.jpg" />
                </div>
                <div className="h-[80vh]">
                    <img src="https://i.ibb.co.com/yfVjgkf/17.jpg" />
                </div>
                <div className="h-[80vh]">
                    <img src="https://i.ibb.co.com/8N47db3/3.png" />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;