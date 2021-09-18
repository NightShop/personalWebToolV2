import { useState } from "react";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const HabitAddPopup = (props) => {
    const { closePopup } = props;

    const [habitName, setHabitName] = useState("");
    const [habitPoints, setHabitPoints] = useState("");

    const db = getFirestore();

    const handleSubmit = async (event) => {
        console.log(`Habit name: ${habitName}, points: ${habitPoints}`);
        setHabitName("");
        setHabitPoints("");
        closePopup();
        const docRef = await addDoc(collection(db, "users"), {
            habit: habitName,
            points: habitPoints,
        });
        console.log("document written with id: ", docRef.id);
        event.preventDefault();
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
