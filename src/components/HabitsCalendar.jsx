import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import HabitCalendarRow from "./HabitCalendarRow";

const HabitsCalendar = (props) => {
    const { closeHabitsCalendar, habitsCalendarInfo, userId } = props;
    const [habitsWithPoints, setHabitsWithPoints] = useState({});
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

    useEffect(() => {
        const db = getFirestore();
        const getData = async () => {
            const querySnapshot = await getDocs(collection(db, "users", userId, "habitDay"));
            querySnapshot.forEach((docu) => {
                console.log(docu.id, " => ", docu.data());
            });
        };
        getData();
    }, [userId]);

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
                    {Object.keys(habitsCalendarInfo).map((key) => <HabitCalendarRow habitDayDate={key} habitsAndPoints={habitsCalendarInfo[key]} />)}
                </tbody>
            </table>
            <button type="button" onClick={closeHabitsCalendar}>Back</button>
        </div>
    );
};

export default HabitsCalendar;
