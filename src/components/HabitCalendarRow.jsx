import uniqid from "uniqid";

import HabitCalendarCell from "./HabitCalendarCell";

const HabitCalendarRow = (props) => {
    const { habitDayDate, habitsAndPoints } = props;
    return (
        <tr>
            <td>{habitDayDate}</td>
            {Object.keys(habitsAndPoints).map((key) => <HabitCalendarCell key={uniqid()} habit={key} points={habitsAndPoints[key]} />)}
        </tr>
    );
};

export default HabitCalendarRow;
