import { useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";

const HabitsInfoHeader = () => {
    useEffect(() => {
        const newFunk = async () => {
            const docRef = await addDoc(collection(db, "users"), {
                nickname: "test1",
            });
            console.log("document written with id: ", docRef.id);
        };

        return () => {
            newFunk();
        };
    });
    return (
        <thead>
            <th>Habit</th>
            <th>Points</th>
        </thead>
    );
};

export default HabitsInfoHeader;
