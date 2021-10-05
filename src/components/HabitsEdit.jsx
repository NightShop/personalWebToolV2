import { useEffect, useState } from "react";
import { doc, onSnapshot, getFirestore, setDoc, deleteField } from "firebase/firestore";
import HabitsInfoHeader from "./HabitsInfoHeader";
import HabitsInfoRow from "./HabitsInfoRow";
import HabitAddPopup from "./HabitAddPopup";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

const HabitsEdit = (props) => {
    const { userId, closeHabitsEdit } = props;
    const [habitsInfo, setHabitsInfo] = useState("");
    const [addHabitPopupOpened, setAddHabitPopupOpened] = useState(false);
    const [habitToModify, setHabitToModify] = useState("");
    const [habitToModifyPoints, setHabitToModifyPoints] = useState("");
    const [habitToDelete, setHabitToDelete] = useState("");
    const [showDeletePopup, setShowDeletePopup] = useState(false);

    const db = getFirestore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "users", userId), (docum) => {
            const userHabitInfo = docum.data();
            if (userHabitInfo) {
                setHabitsInfo(userHabitInfo.habits);
            }
        });
        return () => unsub();
    }, [db, userId]);

    const deleteHabit = (habit) => {
        setShowDeletePopup(true);
        setHabitToDelete(habit);
    };

    const finalDeleteHabit = async () => {
        if (habitToDelete !== "") {
            await setDoc(doc(db, "users", userId), {
                habits: {
                    [habitToDelete]: deleteField(),
                },
            }, { merge: true });
        }
        setHabitToDelete("");
        setShowDeletePopup(false);
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
            {showDeletePopup
                && (
                    <DeleteConfirmationPopup
                        confirmDeletion={() => finalDeleteHabit()}
                        rejectDeletion={() => {
                            setHabitToDelete("");
                            setShowDeletePopup(false);
                        }}
                        message={`Delete habit: ${habitToDelete}`}
                    />
                )}
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
            {addHabitPopupOpened && (
                <HabitAddPopup
                    userId={userId}
                    habitToModifyPoints={habitToModifyPoints}
                    habitToModify={habitToModify}
                    closePopup={() => setAddHabitPopupOpened(!addHabitPopupOpened)}
                    resetTemp={resetTemp}
                />
            )}
            <button type="button" onClick={closeHabitsEdit}>Back</button>
        </div>
    );
};

export default HabitsEdit;
