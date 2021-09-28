import uniqid from "uniqid";

import HabitCalendarCell from "./HabitCalendarCell";

const HabitCalendarRow = (props) => {
    const { habitDayDate, habitDaysCombined, deleteHabitDay, plusPoint, minusPoint } = props;
    const totalPoints = Object.keys(habitDaysCombined).reduce((sum, currentHabit) => sum + (habitDaysCombined[currentHabit].totalPoints), 0);
    return (
        <tr>
            <td>{habitDayDate}</td>
            {Object.keys(habitDaysCombined).sort((a, b) => a > b).map((habit) => (
                <HabitCalendarCell
                  key={uniqid()}
                  habit={habit}
                  points={habitDaysCombined[habit].points}
                  occurence={habitDaysCombined[habit].totalPoints / habitDaysCombined[habit].points}
                  totalPoints={habitDaysCombined[habit].totalPoints}
                  plusPoint={() => plusPoint(habitDayDate, habit, habitDaysCombined[habit].points, habitDaysCombined[habit].totalPoints)}
                  minusPoint={() => minusPoint(habitDayDate, habit, habitDaysCombined[habit].points, habitDaysCombined[habit].totalPoints)}
                />
            ))}
            <td>
                Total:
                {totalPoints}
            </td>
            <td>
                <button type="button" onClick={() => deleteHabitDay(habitDayDate)}>Delete</button>
            </td>
        </tr>
    );
};

export default HabitCalendarRow;
