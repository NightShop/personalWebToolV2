import { useState } from "react";
import HabitsTracker from "./HabitsTracker";
import GratefulnessDiary from "./GratefulnessDiary";

const ToolsMain = () => {
    const [activeSection, setActiveSection] = useState("");
    return (
        <div>
            <nav>
                <h1>Welcome to the tools</h1>
                <button type="button" onClick={() => setActiveSection("gratefulnessDiary")}>Gratefulnes</button>
                <button type="button" onClick={() => setActiveSection("habitsTracker")}>Habits Tracker</button>
            </nav>
            {(activeSection === "habitsTracker") ? <HabitsTracker /> : null}
            {(activeSection === "gratefulnessDiary") ? <GratefulnessDiary /> : null}
        </div>
    );
};

export default ToolsMain;
