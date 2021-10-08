import { useState } from "react";
import HabitsEdit from "./HabitsEdit";
import HabitsCalendar from "./HabitsCalendar";

const HabitsTracker = (props) => {
    const [activeSection, setActiveSection] = useState("");
    const { userId } = props;
    return (
        <div className="text-center border-t-8 mb-10 pt-20 border-gray-500">
            <h1 className="mb-6 font-bold text-3xl mx-auto block underline">habits are like muscles</h1>
            <button
                className={`hover:text-white w-2/5 border-gray-500 bg-rink-light font-bold mx-2 border-4 p-3
                ${activeSection === "habitsEdit" ? "bg-rink-dark" : ""}`}
                type="button"
                onClick={() => setActiveSection("habitsEdit")}
            >
                EDIT HABITS
            </button>
            <button
                className={`hover:text-white w-2/5 border-gray-500 bg-rink-light font-bold mx-2 border-4 p-3
                ${activeSection === "habitsCalendar" ? "bg-rink-dark" : ""}`}
                type="button"
                onClick={() => setActiveSection("habitsCalendar")}
            >
                CALENDAR
            </button>
            {activeSection === "habitsEdit"
                ? <HabitsEdit userId={userId} closeHabitsEdit={() => setActiveSection("")} /> : null}
            {activeSection === "habitsCalendar"
                ? <HabitsCalendar userId={userId} closeHabitsCalendar={() => setActiveSection("")} />
                : null}
        </div>
    );
};

export default HabitsTracker;
