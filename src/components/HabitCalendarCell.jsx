const HabitCalendarCell = (props) => {
    const { habit, points, totalPoints, occurence, plusPoint, minusPoint } = props;
    return (
        <td>
            {habit}
            <br />
            (
            {points}
            pts.)
            <br />
            {Number.isNaN(occurence) ? "Unknown" : occurence}
            *
            {points}
            =
            {totalPoints}
            <button type="button" onClick={plusPoint}>Plus</button>
            <button type="button" onClick={minusPoint}>Minus</button>
        </td>
    );
};

export default HabitCalendarCell;
