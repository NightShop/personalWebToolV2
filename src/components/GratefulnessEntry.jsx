const GratefulnessEntry = (props) => {
    const { title, main } = props;
    return (
        <div>
            <h4>{title}</h4>
            <p>{main}</p>
        </div>
    );
};

export default GratefulnessEntry;
