import { useState } from "react";

const HabitDayAddPopup = (props) => {
    const { createHabitDay } = props;
    const [date, setDate] = useState("");

    const submitDate = (e) => {
        e.preventDefault();
        const dateArr = date.split("-");
        console.log(dateArr);
        const YYYY = dateArr[0];
        const MM = dateArr[1];
        const DD = dateArr[2];
        const newDate = DD.concat("-", MM, "-", YYYY);
        createHabitDay(newDate);
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
