import { useState } from "react";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import GratefulnessSingleForm from "./GratefulnessSingleForm";
import helperFunction from "../assets/helperFunctions";

const GratefulnessNewDay = (props) => {
    const { userId } = props;
    const [entryOne, setEntryOne] = useState([]);
    const [entryTwo, setEntryTwo] = useState([]);
    const [entryThree, setEntryThree] = useState([]);
    const [entryFour, setEntryFour] = useState([]);
    const [entryFive, setEntryFive] = useState([]);
    const [date, setDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const gratefulnessDay = {
            [entryOne.title]: entryOne.main,
            [entryTwo.title]: entryTwo.main,
            [entryThree.title]: entryThree.main,
            [entryFour.title]: entryFour.main,
            [entryFive.title]: entryFive.main,
        };

        const tempDate = helperFunction.stringifyDate(date);

        const db = getFirestore();
        (async () => {
            console.log("date to enter setDoc: ", tempDate);
            console.log(gratefulnessDay);
            await setDoc(doc(db, "users", userId, "gratefulnessDays", tempDate), { ...gratefulnessDay });
        })();
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
