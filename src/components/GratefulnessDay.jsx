import GratefulnessEntry from "./GratefulnessEntry";

const GratefulnessDay = (props) => {
    const { dayData, date, deleteEntry } = props;
    return (
        <div className="m-6 p-3 rounded bg-gray-400">
            <h1 className="text-3xl">{date}</h1>
            <button type="button" className="btn-test" onClick={() => deleteEntry(date)}>Delete</button>
            <div className="flex flex-wrap justify-around">
                {Object.entries(dayData).map(([title, main]) => <GratefulnessEntry title={title} main={main} />)}
            </div>
        </div>
    );
};

export default GratefulnessDay;
