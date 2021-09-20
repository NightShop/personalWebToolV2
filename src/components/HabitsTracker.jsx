import { useEffect, useState } from "react";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import HabitsEdit from "./HabitsEdit";
import HabitsCalendar from "./HabitsCalendar";

const HabitsTracker = (props) => {
    const [activeSection, setActiveSection] = useState("");
    const [habitsInfo, setHabitsInfo] = useState({
        "Cold Shower": 5,
        "Intermittent Fasting": 2,
        "One Beer": -5,
    });
 
/* 
    const db = getFirestore();
    const userRef = doc(db, "users", props.userId);

    useEffect(() => {
        if (docSnap.exists()) {
            setHabitsInfo(docSnap.data());
        }
    }, [docSnap]); */

    const habitsCalendarInfo = {
        "03/03/2021": {
            "Cold Shower": 1,
            "Intermittent Fasting": 0,
            "One Beer": 2,
        },
        "03/04/2021": {
            "Cold Shower": 0,
            "Intermittent Fasting": 1,
            "One Beer": 0,
        },
    };

    return (
        <div>
            <h1>HabitsTracker!!!</h1>
            {activeSection === "habitsEdit" ? <HabitsEdit userId={props.userId} closeHabitsEdit={() => setActiveSection("")} habitsInfo={habitsInfo} /> : null}
            {activeSection === "habitsCalendar"
                ? <HabitsCalendar closeHabitsCalendar={() => setActiveSection("")} habitsCalendarInfo={habitsCalendarInfo} />
                : null}
            <button type="button" onClick={() => setActiveSection("habitsEdit")}>Edit Habits</button>
            <button type="button" onClick={() => setActiveSection("habitsCalendar")}>Calendar</button>
        </div>
    );
};

export default HabitsTracker;
