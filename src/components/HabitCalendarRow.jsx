import uniqid from "uniqid";

import HabitCalendarCell from "./HabitCalendarCell";

const HabitCalendarRow = (props) => {
    const { habitDayDate, habitDaysCombined } = props;
    console.log("im in habit calendar row", habitDaysCombined);
    const totalPoints = Object.keys(habitDaysCombined).reduce((sum, currentHabit) => {
        console.log(sum);
        return sum + (habitDaysCombined[currentHabit].points) * (habitDaysCombined[currentHabit].occurence);
    }, 0);
    return (
        <tr>
            <td>{habitDayDate}</td>
            {Object.keys(habitDaysCombined).map((habit) => (
                <HabitCalendarCell
                  key={uniqid()}
                  habit={habit}
                  points={habitDaysCombined[habit].points}
                  occurence={habitDaysCombined[habit].occurence}
                />
            ))}
            <td>
                Total:
                {totalPoints}
            </td>
        </tr>
    );
};

export default HabitCalendarRow;
