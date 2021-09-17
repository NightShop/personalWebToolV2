import HabitCalendarRow from "./HabitCalendarRow";

const HabitsCalendar = (props) => {
    const { closeHabitsCalendar, habitsCalendarInfo } = props;
    return (
        <div>
            <h3>
                Habits Calendar
            </h3>
            <table>
                <thead>
                    <tr>
                        <td>
                            neki
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(habitsCalendarInfo).map((key) => <HabitCalendarRow habitDayDate={key} habitsAndPoints={habitsCalendarInfo[key]} />)}
                </tbody>
            </table>
            <button type="button" onClick={closeHabitsCalendar}>Back</button>
        </div>
    );
};

export default HabitsCalendar;
