import { useState } from "react";
import HabitsEdit from "./HabitsEdit";
import HabitsCalendar from "./HabitsCalendar";

const HabitsTracker = (props) => {
    const [activeSection, setActiveSection] = useState("");
    const { userId } = props;
    return (
        <div className="text-center">
            <h1 className="mb-6 font-bold text-3xl mx-auto block underline">habits are like muscles</h1>
            <button className=" w-2/5 font-light shadow-md btn-test" type="button" onClick={() => setActiveSection("habitsEdit")}>EDIT HABITS</button>
            <button className="w-2/5 font-light shadow-md btn-test" type="button" onClick={() => setActiveSection("habitsCalendar")}>CALENDAR</button>
            {activeSection === "habitsEdit"
            ? <HabitsEdit userId={userId} closeHabitsEdit={() => setActiveSection("")} /> : null}
            {activeSection === "habitsCalendar"
            ? <HabitsCalendar userId={userId} closeHabitsCalendar={() => setActiveSection("")} />
            : null}
        </div>
    );
};

export default HabitsTracker;
