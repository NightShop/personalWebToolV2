import uniqid from "uniqid";
import GratefulnessEntry from "./GratefulnessEntry";

const GratefulnessDay = (props) => {
    const { dayData, date, deleteEntry } = props;
    return (
        <div className="m-6 p-3 rounded bg-green-400 shadow-2xl">
            <h1 className="text-3xl">{date}</h1>
            <button type="button" className="btn-test" onClick={() => deleteEntry(date)}>Delete</button>
            <div className="flex flex-wrap justify-around">
                {Object.entries(dayData).map(([title, main]) => <GratefulnessEntry key={uniqid()} title={title} main={main} />)}
            </div>
        </div>
    );
};

export default GratefulnessDay;
