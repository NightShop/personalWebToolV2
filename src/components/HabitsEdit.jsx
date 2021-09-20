import { useEffect, useState } from "react";
import {
    doc, onSnapshot, getFirestore, setDoc, deleteField,
} from "firebase/firestore";
import HabitsInfoHeader from "./HabitsInfoHeader";
import HabitsInfoRow from "./HabitsInfoRow";
import HabitAddPopup from "./HabitAddPopup";

const HabitsEdit = (props) => {
    const { userId, closeHabitsEdit } = props;
    const [habitsInfo, setHabitsInfo] = useState("");
    const [addHabitPopupOpened, setAddHabitPopupOpened] = useState(false);
    const [habitToModify, setHabitToModify] = useState("");
    const [habitToModifyPoints, setHabitToModifyPoints] = useState("");

    const db = getFirestore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", userId), (docum) => {
            const userHabitInfo = docum.data();
            setHabitsInfo(userHabitInfo.habits);
            console.log("got data: ", userHabitInfo.habits);
        });
        return () => unsub();
    }, [db, userId]);

    const deleteHabit = async (habitToDelete) => {
        if (habitToDelete !== "") {
            await setDoc(doc(db, "users", userId), {
                habits: {
                    [habitToDelete]: deleteField(),
                },
            }, { merge: true });
        }
    };

    const openUpdatePopup = (habit, points) => {
        setAddHabitPopupOpened(true);
        setHabitToModify(habit);
        setHabitToModifyPoints(points);
    };

    const resetTemp = () => {
        setHabitToModify("");
        setHabitToModifyPoints("");
    };

    return (
        <div>
            <h1>
                user:
                {userId}
            </h1>
            <table>
                <HabitsInfoHeader />
                <tbody>
                    {habitsInfo && Object.keys(habitsInfo)
                        .sort((a, b) => a.toUpperCase() > b.toUpperCase())
                        .map((key) => (
                            <HabitsInfoRow
                              openPopup={openUpdatePopup}
                              resetTemp={resetTemp}
                              deleteHabit={deleteHabit}
                              habitInfo={[key, habitsInfo[key]]}
                            />
                        ))}
                </tbody>
            </table>
            <button type="button" onClick={() => setAddHabitPopupOpened(!addHabitPopupOpened)}>Add new habit</button>
            {
                addHabitPopupOpened
                && (
                    <HabitAddPopup
                      userId={userId}
                      habitToModifyPoints={habitToModifyPoints}
                      habitToModify={habitToModify}
                      closePopup={() => setAddHabitPopupOpened(!addHabitPopupOpened)}
                      resetTemp={resetTemp}
                    />
                )
            }
            <button type="button" onClick={closeHabitsEdit}>Back</button>
        </div>
    );
};

export default HabitsEdit;
