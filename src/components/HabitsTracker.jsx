import { useState } from "react";
import HabitsEdit from "./HabitsEdit";
import HabitsCalendar from "./HabitsCalendar";

const HabitsTracker = (props) => {
    const [activeSection, setActiveSection] = useState("");
    const { userId } = props;
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
            {activeSection === "habitsEdit"
            ? <HabitsEdit userId={userId} closeHabitsEdit={() => setActiveSection("")} /> : null}
            {activeSection === "habitsCalendar"
            ? <HabitsCalendar closeHabitsCalendar={() => setActiveSection("")} habitsCalendarInfo={habitsCalendarInfo} />
            : null}
            <button type="button" onClick={() => setActiveSection("habitsEdit")}>Edit Habits</button>
            <button type="button" onClick={() => setActiveSection("habitsCalendar")}>Calendar</button>
        </div>
    );
};

export default HabitsTracker;
