
const SectionTitle = (props = {}) => {
    const { title, subTitle } = props || {}
    return (
        <div contenteditable="true" className="my-10 w-4/12 text-center mx-auto">
            <p className="text-orange-400 mb-2 ">--- {subTitle} ---</p>
            <h1 className="border-y-4 py-3 uppercase  text-2xl">{title}</h1>
        </div>
    );
};

export default SectionTitle;