import { useState } from "react";
import {
    doc, getFirestore, setDoc, deleteField,
} from "firebase/firestore";

const HabitAddPopup = (props) => {
    const {
        closePopup, habitToModify, habitToModifyPoints, resetTemp,
    } = props;

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
        <div style={{
            width: "300px",
            height: "300px",
            position: "fixed",
            display: "block",
            border: "solid 1px white",
            backgroundColor: "gray",
            left: "35vw",
            top: "10vw",
            boxShadow: "rgba(0, 0, 0, 0.9) 0px 5px 15px",
        }}
        >
            <h3>Add Habit</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Habit title:
                    <input type="text" value={habitName} onChange={(event) => setHabitName(event.target.value)} />
                </label>
                <label>
                    Points:
                    <input type="number" value={habitPoints} onChange={(event) => setHabitPoints(event.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <button type="button" onClick={closePopup}>Back</button>
        </div>
    );
};

export default HabitAddPopup;
