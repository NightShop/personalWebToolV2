import { useState } from "react";
import {
    doc, getFirestore, setDoc, deleteField,
} from "firebase/firestore";

const HabitAddPopup = (props) => {
    const { closePopup, habitToModify, habitToModifyPoints, resetTemp } = props;

    const [habitName, setHabitName] = useState(habitToModify);
    const [habitPoints, setHabitPoints] = useState(habitToModifyPoints);

    const db = getFirestore();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(`Habit name: ${habitName}, points: ${habitPoints}`);
        console.log(`Habit to modify: ${habitToModify}`);
        if (habitToModify && (habitToModify !== habitName)) {
            await setDoc(doc(db, "users", props.userId), {
                habits: {
                    [habitName]: habitPoints,
                    [habitToModify]: deleteField(),
                },
            }, { merge: true });
        } else {
            await setDoc(doc(db, "users", props.userId), {
                habits: {
                    [habitName]: habitPoints,
                },
            }, { merge: true });
        }

        setHabitName("");
        setHabitPoints("");
        resetTemp();
        console.log("document written with id: ", props.userId);
        closePopup();
    };

    return (
        <div
            className="block fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96
        bg-green-400 border-rink-dark rounded-md border-8 shadow-2xl"
        >
            <h3 className="font-bold m-3">ADD HABIT</h3>
            <form onSubmit={handleSubmit} className="flex flex-wrap">
                <label className="m-4 font-bold border-b-2 flex justify-between border-black">
                    TITLE :
                    <input className="ml-4 pl-2 w-2/3" type="text" value={habitName} onChange={(event) => setHabitName(event.target.value)} />
                </label>
                <label className="font-bold border-b-2 flex justify-between border-black m-4">
                    POINTS :
                    <input className="ml-2 pl-2 w-2/3" type="number" value={habitPoints} onChange={(event) => setHabitPoints(event.target.value)} />
                </label>
                <br />
                <input className="btn-test mx-auto" type="submit" value="Submit" />
            </form>
            <button className="btn-test" type="button" onClick={closePopup}>Back</button>
        </div>
    );
};

export default HabitAddPopup;
