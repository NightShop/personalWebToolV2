import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import HabitCalendarRow from "./HabitCalendarRow";

const HabitsCalendar = (props) => {
    const { closeHabitsCalendar, userId } = props;
    const [habitsWithPoints, setHabitsWithPoints] = useState({});
    const [habitDays, setHabitDays] = useState({});
    const [habitDaysCombined, setHabitDaysCombined] = useState({});

    // fetch habits with points

    useEffect(() => {
        const db = getFirestore();
        const docRef = doc(db, "users", userId);
        const getData = async () => {
            await getDoc(docRef).then((data) => {
                setHabitsWithPoints(data.data().habits);
                console.log(data.data().habits);
            });
        };
        getData();
    }, [userId]);

    // fetch days with habits => habitDays

    useEffect(() => {
        const habitsTemp = {};
        const db = getFirestore();
        (async () => {
            const querySnapshot = await getDocs(collection(db, "users", userId, "habitDay"));
            querySnapshot.forEach((docu) => {
                console.log(docu.id, " => ", docu.data());
                habitsTemp[docu.id] = docu.data();
            });
            setHabitDays(habitsTemp);
        })();
    }, [userId]);

    // setting combined data for rows

    useEffect(() => {
        if (habitDays !== {} && habitsWithPoints !== {}) {
            const tempObj = {};
            console.log("start combined data");
            console.log("habitdays:", habitDays);
            console.log("habitsWithPoints", habitsWithPoints);
            Object.keys(habitDays).forEach((date) => {
                console.log(date);
                tempObj[date] = {};
                Object.entries(habitDays[date]).forEach(([name, occurence]) => {
                    console.log("this is date and name", date, name, occurence);
                    tempObj[date][name] = {
                        occurence,
                        points: habitsWithPoints[name],
                    };
                });
            });
            console.log("temp object", tempObj);
            setHabitDaysCombined(tempObj);
        }
    }, [habitDays, habitsWithPoints]);


    return (
        <div>
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
                    {Object.keys(habitDaysCombined).map((date) => <HabitCalendarRow habitDayDate={date} habitDaysCombined={habitDaysCombined[date]} />)}
                </tbody>
            </table>
            <button type="button" onClick={closeHabitsCalendar}>Back</button>
        </div>
    );
};

export default HabitsCalendar;
