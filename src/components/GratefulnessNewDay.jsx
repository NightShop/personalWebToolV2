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
                <label>
                    Date
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <GratefulnessSingleForm setEntry={setEntryOne} />
                <GratefulnessSingleForm setEntry={setEntryTwo} />
                <GratefulnessSingleForm setEntry={setEntryThree} />
                <GratefulnessSingleForm setEntry={setEntryFour} />
                <GratefulnessSingleForm setEntry={setEntryFive} />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default GratefulnessNewDay;
