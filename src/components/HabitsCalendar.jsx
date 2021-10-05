import uniqid from "uniqid";
import { getFirestore, doc, getDoc, collection, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import HabitCalendarRow from "./HabitCalendarRow";
import HabitDayAddPopup from "./HabitDayAddPopup";
import WarningPopUp from "./WarningPopUp";
import DeleteConfirmationPopup from "./DeleteConfirmationPopup";

const HabitsCalendar = (props) => {
    const { closeHabitsCalendar, userId } = props;
    const [habitsWithPoints, setHabitsWithPoints] = useState({});
    const [habitDays, setHabitDays] = useState({});
    const [habitDaysCombined, setHabitDaysCombined] = useState({});
    const [showHabitDayAddPopup, setShowHabitDayAddPopup] = useState(false);
    const [showWarningPopup, setShowWarningPopup] = useState(false);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [habitDateToDelete, setHabitDateToDelete] = useState("");
    const [showWarningPopupNoDate, setShowWarningPopupNoDate] = useState(false);

    const db = getFirestore();

    // fetch habits with points

    useEffect(() => {
        const docRef = doc(db, "users", userId);
        const getData = async () => {
            await getDoc(docRef).then((data) => {
                setHabitsWithPoints(data.data().habits);
            });
        };
        getData();
    }, [userId, db]);

    // fetch days with habits => habitDays

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "users", userId, "habitDay"), (document) => {
            const habitsTemp = {};
            document.forEach((docu) => {
                habitsTemp[docu.id] = docu.data();
            });
            setHabitDays({ ...habitsTemp });
        });
        return () => unsub();

        /*  (async () => {
             const querySnapshot = await getDocs(collection(db, "users", userId, "habitDay"));
             querySnapshot.forEach((docu) => {
                 console.log(docu.id, " => ", docu.data());
                 habitsTemp[docu.id] = docu.data();
             });
             console.log("habits temp", habitsTemp);
             setHabitDays(habitsTemp);
         })(); */
    }, [userId, db]);

    // setting combined data for rows

    useEffect(() => {
        if (habitDays !== {} && habitsWithPoints !== {}) {
            const tempObj = {};
            Object.keys(habitDays).forEach((date) => {
                tempObj[date] = {};
                Object.entries(habitDays[date]).forEach(([name, totalPoints]) => {
                    tempObj[date][name] = {
                        totalPoints,
                        points: habitsWithPoints[name],
                    };
                });
            });
            setHabitDaysCombined(tempObj);
        }
    }, [habitDays, habitsWithPoints]);

    const newHabitDay = (date) => {
        if (Object.keys(habitDays).some((key) => key === date)) {
            setShowWarningPopup(true);
            return;
        }
        const tempObj = {};
        Object.keys(habitsWithPoints).forEach((key) => {
            tempObj[key] = 0;
        });
        (async () => {
            await setDoc(doc(db, "users", userId, "habitDay", date), {
                ...tempObj,
            });
        })();
    };

    const deleteHabitDay = (date) => {
        setShowDeleteConfirmation(true);
        setHabitDateToDelete(date);
    };

    const deleteHabitDayFinal = async () => {
        if (habitDateToDelete !== "") {
            await deleteDoc(doc(db, "users", userId, "habitDay", habitDateToDelete));
        }
        setShowDeleteConfirmation(false);
        setHabitDateToDelete("");
    };

    const plusPoint = (date, habit, points, totalPoints) => {
        const pointsFinal = parseInt(points, 10) + parseInt(totalPoints, 10);
        setDoc(doc(db, "users", userId, "habitDay", date), {
            [habit]: pointsFinal,
        },
            {
                merge: true,
            });
    };

    const minusPoint = (date, habit, points, totalPoints) => {
        const pointsFinal = -parseInt(points, 10) + parseInt(totalPoints, 10);
        setDoc(doc(db, "users", userId, "habitDay", date), {
            [habit]: pointsFinal,
        },
            {
                merge: true,
            });
    };

    return (
        <div>
            {showDeleteConfirmation
                && (
                    <DeleteConfirmationPopup
                        confirmDeletion={() => deleteHabitDayFinal()}
                        rejectDeletion={() => {
                            setHabitDateToDelete("");
                            setShowDeleteConfirmation(false);
                        }}
                        message={`Do you realy want to delete entry from ${habitDateToDelete}`}
                    />
                )}
            {showWarningPopup && <WarningPopUp closePopup={() => setShowWarningPopup(false)} message="Date already exist, choose new date" />}
            {showWarningPopupNoDate && <WarningPopUp closePopup={() => setShowWarningPopupNoDate(false)} message="You Have to enter a date" />}
            {showHabitDayAddPopup && <HabitDayAddPopup createHabitDay={newHabitDay} showWarningPopup={() => setShowWarningPopupNoDate} />}
            <h3>
                Habits Calendar
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        {Object.entries(habitsWithPoints).map(([key, value]) => (
                            <th key={key}>
                                {key}
                                <br />
                                (
                                {value}
                                pts)
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(habitDaysCombined).sort((a, b) => {
                        const [aDD, aMM, aYYYY] = a.split("-");
                        const [bDD, bMM, bYYYY] = b.split("-");
                        return new Date(bYYYY, bMM - 1, bDD) - new Date(aYYYY, aMM - 1, aDD);
                    }).map((date) => (
                        <HabitCalendarRow
                            key={uniqid()}
                            habitDayDate={date}
                            deleteHabitDay={deleteHabitDay}
                            habitDaysCombined={habitDaysCombined[date]}
                            plusPoint={plusPoint}
                            minusPoint={minusPoint}
                        />
                    ))}
                </tbody>
            </table>
            <button type="button" onClick={() => setShowHabitDayAddPopup((prevState) => !prevState)}>Add new</button>
            <button type="button" onClick={closeHabitsCalendar}>Back</button>
        </div>
    );
};

export default HabitsCalendar;
