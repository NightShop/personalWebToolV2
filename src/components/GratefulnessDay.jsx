import GratefulnessEntry from "./GratefulnessEntry";

const GratefulnessDay = (props) => {
    const { dayData, date, deleteEntry } = props;
    console.log("dayData", dayData);
    return (
        <div>
            <h1>{date}</h1>
            <button type="button" onClick={() => deleteEntry(date)}>Delete</button>
            {Object.entries(dayData).map(([title, main]) => <GratefulnessEntry title={title} main={main} />)}
        </div>
    );
};

export default GratefulnessDay;
