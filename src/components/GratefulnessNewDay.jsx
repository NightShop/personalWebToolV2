import { useState } from "react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import GratefulnessSingleForm from "./GratefulnessSingleForm";
import helperFunction from "../assets/helperFunctions";

const GratefulnessNewDay = (props) => {
    const { userId, usedDates, showWarningPopup, closeNewPopup } = props;
    const [entryOne, setEntryOne] = useState([]);
    const [entryTwo, setEntryTwo] = useState([]);
    const [entryThree, setEntryThree] = useState([]);
    const [entryFour, setEntryFour] = useState([]);
    const [entryFive, setEntryFive] = useState([]);
    const [date, setDate] = useState(helperFunction.todayDateString());

    const handleSubmit = (e) => {
        e.preventDefault();

        if (date === "") {
            showWarningPopup("empty date does not go through");
            return;
        }

        const tempDate = helperFunction.stringifyDate(date);
        if (usedDates.some((usedDate) => usedDate === tempDate)) {
            showWarningPopup("Date is already used");
            return;
        }

        const gratefulnessDay = {
            [entryOne.title]: entryOne.main,
            [entryTwo.title]: entryTwo.main,
            [entryThree.title]: entryThree.main,
            [entryFour.title]: entryFour.main,
            [entryFive.title]: entryFive.main,
        };

        const filteredGratefulnessDay = Object.keys(gratefulnessDay)
            .filter((key) => (gratefulnessDay[key] !== ""))
            .reduce((obj, key) => ({ ...obj, [key]: gratefulnessDay[key] }), {});
        const db = getFirestore();
        (async () => {
            await setDoc(doc(db, "users", userId, "gratefulnessDays", tempDate), { ...filteredGratefulnessDay });
        })();
        closeNewPopup();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="font-bold tracking-widest">
                    ENTER DATE:
                    <input
                        className="font-bold tracking-widest border-2 p-1 m-3"
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </label>
                <GratefulnessSingleForm number="1" setEntry={setEntryOne} />
                <GratefulnessSingleForm number="2" setEntry={setEntryTwo} />
                <GratefulnessSingleForm number="3" setEntry={setEntryThree} />
                <GratefulnessSingleForm number="4" setEntry={setEntryFour} />
                <GratefulnessSingleForm number="5" setEntry={setEntryFive} />
                <input type="submit" value="Submit" className="btn-test" />
            </form>
        </div>
    );
};

export default GratefulnessNewDay;
