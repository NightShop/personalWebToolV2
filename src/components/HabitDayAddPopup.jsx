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
        <div className="bg-green-400 my-4">
            <form onSubmit={submitDate}>
                <label className="font-bold">
                    DATE:
                    <input className="m-4 font-bold" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label>
                <input className="btn-test" type="submit" value="add day" />
            </form>
        </div>
    );
};

export default HabitDayAddPopup;
