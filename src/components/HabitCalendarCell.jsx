const HabitCalendarCell = (props) => {
    const { habit, points } = props;
    return (
        <td>
            {habit}
            <br />
            {points}
        </td>
    );
};

export default HabitCalendarCell;
