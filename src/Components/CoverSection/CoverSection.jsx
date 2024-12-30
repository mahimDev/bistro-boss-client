import { Parallax } from "react-parallax";


const CoverSection = ({ img, title, p }) => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage={img}
            bgImageAlt="the dog"
            strength={-200}
        >
            <div className="h-[500px]">
                <div className="m-[200px]  text-center text-gray-50 bg-black/20 p-40">
                    <h1 className="text-4xl font-semibold uppercase">{title}</h1>
                    <p className="mt-2 uppercase">{p}</p>
                </div>
            </div>
        </Parallax>
    );
};

export default CoverSection;