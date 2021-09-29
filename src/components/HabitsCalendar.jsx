import uniqid from "uniqid";
import { getFirestore, doc, getDoc, collection, setDoc, onSnapshot, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import HabitCalendarRow from "./HabitCalendarRow";
import HabitDayAddPopup from "./HabitDayAddPopup";

const HabitsCalendar = (props) => {
    const { closeHabitsCalendar, userId } = props;
    const [habitsWithPoints, setHabitsWithPoints] = useState({});
    const [habitDays, setHabitDays] = useState({});
    const [habitDaysCombined, setHabitDaysCombined] = useState({});
    const [showHabitDayAddPopup, setShowHabitDayAddPopup] = useState(false);

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
            console.log("new query", document.docs);
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
        console.log("new habit days combined set up");
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
            console.log(tempObj, habitDays, habitsWithPoints);
        }
    }, [habitDays, habitsWithPoints]);

    const newHabitDay = (date) => {
        console.log(habitsWithPoints);
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

    const deleteHabitDay = async (date) => {
        await deleteDoc(doc(db, "users", userId, "habitDay", date));
    };

    const plusPoint = (date, habit, points, totalPoints) => {
        console.log(date, habit, points, totalPoints);
        const pointsFinal = parseInt(points, 10) + parseInt(totalPoints, 10);
        setDoc(doc(db, "users", userId, "habitDay", date), {
            [habit]: pointsFinal,
        },
            {
                merge: true,
            });
    };

    const minusPoint = (date, habit, points, totalPoints) => {
        console.log(date, habit, points, totalPoints);
    };

    return (
        <div>
            {showHabitDayAddPopup && <HabitDayAddPopup createHabitDay={newHabitDay} />}
            <h3>
                Habits Calendar
            </h3>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        {Object.entries(habitsWithPoints).map(([key, value]) => (
                            <th>
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
