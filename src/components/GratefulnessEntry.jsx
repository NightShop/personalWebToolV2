const GratefulnessEntry = (props) => {
    const { title, main } = props;
    return (
        <div className="border p-3 m-4 w-80 bg-gray-300 border-white border-2">
            <h4 className="font-semibold text-xl">{title}</h4>
            <p>{main}</p>
        </div>
    );
};

export default GratefulnessEntry;
