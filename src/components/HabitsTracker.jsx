import { useState } from "react";
import HabitsEdit from "./HabitsEdit";
import HabitsCalendar from "./HabitsCalendar";

const HabitsTracker = (props) => {
    const [activeSection, setActiveSection] = useState("");
    const { userId } = props;
    return (
        <div>
            <h1>HabitsTracker!!!</h1>
            {activeSection === "habitsEdit"
            ? <HabitsEdit userId={userId} closeHabitsEdit={() => setActiveSection("")} /> : null}
            {activeSection === "habitsCalendar"
            ? <HabitsCalendar userId={userId} closeHabitsCalendar={() => setActiveSection("")} />
            : null}
            <button type="button" onClick={() => setActiveSection("habitsEdit")}>Edit Habits</button>
            <button type="button" onClick={() => setActiveSection("habitsCalendar")}>Calendar</button>
        </div>
    );
};

export default HabitsTracker;
