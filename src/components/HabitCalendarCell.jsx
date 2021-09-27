const HabitCalendarCell = (props) => {
    const { habit, points, occurence } = props;
    return (
        <td>
            {habit}
            <br />
            (
            {points}
            pts.)
            <br />
            {occurence}
            *
            {points}
        </td>
    );
};

export default HabitCalendarCell;
