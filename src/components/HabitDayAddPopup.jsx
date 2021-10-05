import { useState } from "react";
import helperFunction from "../assets/helperFunctions";

const HabitDayAddPopup = (props) => {
    const { createHabitDay, showWarningPopup } = props;
    const [date, setDate] = useState(helperFunction.todayDateString());
    const submitDate = (e) => {
        e.preventDefault();
        if (date === "") {
            showWarningPopup();
            return;
        }
        createHabitDay(helperFunction.stringifyDate(date));
    };
    return (
        <div>
            <form onSubmit={submitDate}>
                <label>
                    Date
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <input type="submit" value="add day" />
            </form>
        </div>
    );
};

export default HabitDayAddPopup;
